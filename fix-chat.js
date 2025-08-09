const fs = require('fs');

// Read the current ChatView.tsx
let chatContent = fs.readFileSync('src/components/ChatView.tsx', 'utf8');

// Find the line that's causing the issue (line 21)
const lines = chatContent.split('\n');
console.log('Line 21 content:', lines[20]); // 0-indexed

// Fix the truncated line - it should be a complete useState declaration
if (lines[20] && lines[20].includes('useState(coachPersonalities[0])')) {
  // Line is already correct
} else if (lines[20] && lines[20].includes('setSelectedCoach] =')) {
  // Line is truncated, fix it
  lines[20] = '  const [selectedCoach, setSelectedCoach] = useState(coachPersonalities[0]);';
  chatContent = lines.join('\n');
  fs.writeFileSync('src/components/ChatView.tsx', chatContent);
  console.log('Fixed ChatView.tsx line 21');
} else {
  console.log('Unexpected content at line 21, needs manual fix');
}
