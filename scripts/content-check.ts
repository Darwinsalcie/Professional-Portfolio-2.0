import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'

interface TodoItem {
  file: string
  line: number
  text: string
}

function findTodos(dir: string, items: TodoItem[] = []): TodoItem[] {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    if (stat.isDirectory()) {
      findTodos(fullPath, items)
    } else if (entry.endsWith('.ts') || entry.endsWith('.tsx')) {
      const content = readFileSync(fullPath, 'utf-8')
      const lines = content.split('\n')
      lines.forEach((lineText, index) => {
        const match = /\/\/\s*TODO\(content\):\s*(.+)$/.exec(lineText)
        if (match?.[1]) {
          items.push({
            file: relative(process.cwd(), fullPath).replace(/\\/g, '/'),
            line: index + 1,
            text: match[1].trim(),
          })
        }
      })
    }
  }
  return items
}

const contentDir = join(process.cwd(), 'src', 'content')
const todos = findTodos(contentDir)

console.log(`\nFound ${String(todos.length)} TODO(content) item(s):\n`)
for (const item of todos) {
  console.log(`  ${item.file}:${String(item.line)} - ${item.text}`)
}

let markdown = '# CONTENT_CHECKLIST.md — Content review checklist\n\n'
markdown +=
  'List of all pending content placeholders that need verification and owner real data before production release.\n'
markdown += 'Generated automatically via `pnpm content:check`.\n\n'

const grouped = new Map<string, TodoItem[]>()
for (const item of todos) {
  const existing = grouped.get(item.file)
  if (existing) {
    existing.push(item)
  } else {
    grouped.set(item.file, [item])
  }
}

for (const [file, items] of grouped.entries()) {
  markdown += `### \`${file}\`\n\n`
  for (const item of items) {
    markdown += `- [ ] Line ${String(item.line)}: ${item.text}\n`
  }
  markdown += '\n'
}

writeFileSync(join(process.cwd(), 'CONTENT_CHECKLIST.md'), markdown, 'utf-8')
console.log(`Updated CONTENT_CHECKLIST.md with ${String(todos.length)} item(s).\n`)
