// Use Node requires for path and fs to avoid ESM interop issues under ts-jest
const path = require('path') as typeof import('path')
const fs = require('fs') as typeof import('fs')
import postcss from 'postcss'
// IMPORTANT: require Tailwind plugin in CJS form
const tailwindcss = require('tailwindcss')

describe('index.css (Tailwind + base CSS)', () => {
  const cssPath = path.resolve(__dirname, '..', 'src', 'index.css')
  // If your Tailwind config is .cjs, change this to 'tailwind.config.cjs'
  const tailwindConfigPath = path.resolve(__dirname, '..', 'tailwind.config.js')

  let inputCss = ''
  let resultCss = ''

  beforeAll(async () => {
    inputCss = fs.readFileSync(cssPath, 'utf8')

    // Resolve Tailwind config object explicitly for the plugin
    const tailwindConfig = require(tailwindConfigPath)

    const processor = postcss([
      tailwindcss(tailwindConfig),
      // Optionally include autoprefixer here:
      // require('autoprefixer')
    ])

    const result = await processor.process(inputCss, { from: cssPath })
    resultCss = result.css
  }, 30000)

  test('should process without errors and produce output', () => {
    expect(resultCss).toBeTruthy()
    expect(resultCss.length).toBeGreaterThan(0)
  })

  test('should define :root light theme variables', () => {
    expect(resultCss).toMatch(/--background:\s*0 0% 100%/)
    expect(resultCss).toMatch(/--foreground:\s*222\.2 84% 4\.9%/)
    expect(resultCss).toMatch(/--primary:\s*221\.2 83\.2% 53\.3%/)
    expect(resultCss).toMatch(/--ring:\s*221\.2 83\.2% 53\.3%/)
    expect(resultCss).toMatch(/--border:\s*214\.3 31\.8% 91\.4%/)
  })

  test('should define .dark theme variables', () => {
    expect(resultCss).toMatch(/\.dark\s*{\s*--background:\s*222\.2 84% 4\.9%/)
    expect(resultCss).toMatch(/--foreground:\s*210 40% 98%/)
    expect(resultCss).toMatch(/--destructive:\s*0 62\.8% 30\.6%/)
  })

  test('should include global base styles and body base styles', () => {
    // Match body { with optional whitespace
    expect(resultCss).toMatch(/body\s*{/)
  })

  test('should include text-size-adjust properties on html', () => {
    expect(resultCss).toMatch(/html\s*{\s*text-size-adjust:\s*100%/)
    expect(resultCss).toMatch(/-webkit-text-size-adjust:\s*100%/)
  })
})
