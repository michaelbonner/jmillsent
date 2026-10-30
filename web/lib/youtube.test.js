import { expect, test } from 'bun:test'
import { getYouTubeStartSeconds, getYouTubeVideoId } from './youtube'

test.each([
  'https://www.youtube.com/watch?v=ZcuVkALJjmA',
  'https://m.youtube.com/watch?v=ZcuVkALJjmA&t=30',
  'https://youtu.be/ZcuVkALJjmA?t=30',
  'https://www.youtube.com/embed/ZcuVkALJjmA',
  'https://www.youtube.com/shorts/ZcuVkALJjmA',
  'https://www.youtube.com/live/ZcuVkALJjmA',
])('extracts a YouTube video ID from %s', (url) => {
  expect(getYouTubeVideoId(url)).toBe('ZcuVkALJjmA')
})

test.each([
  'https://youtube.com.evil.example/watch?v=ZcuVkALJjmA',
  'https://www.youtube.com/watch?v=invalid',
  'https://www.youtube.com/playlist?list=ZcuVkALJjmA',
  'javascript:alert(1)',
  '',
])('rejects non-video URL %s', (url) => {
  expect(getYouTubeVideoId(url)).toBeNull()
})

test.each([
  ['https://youtu.be/ZcuVkALJjmA?t=90', 90],
  ['https://youtu.be/ZcuVkALJjmA?t=1m30s', 90],
  ['https://www.youtube.com/watch?v=ZcuVkALJjmA&start=90', 90],
  ['https://youtu.be/ZcuVkALJjmA?t=invalid', 0],
  ['https://example.com/?t=90', 0],
])('reads the start time from %s', (url, seconds) => {
  expect(getYouTubeStartSeconds(url)).toBe(seconds)
})
