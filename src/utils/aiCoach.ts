import { UserProfile } from '../types';

export type CoachPersonality = 'motivational' | 'empathetic' | 'analytical' | 'creative' | 'stoic';

const personalityResponses: Record<CoachPersonality, Record<string, string[]>> = {
  motivational: {
    greeting: [
      "Let's crush those goals today! 💪",
      "You've got this, champion! 🏆",
      "Time to make today amazing! ⚡",
    ],
    encouragement: [
      "Every small step counts! Keep pushing forward!",
      "You're stronger than you think! Let's do this!",
      "Success is just around the corner - don't give up!",
    ],
    taskComplete: [
      "BOOM! That's how it's done! 🎯",
      "You're on fire today! Keep that momentum going! 🔥",
      "Another win in the books! You're unstoppable! 💪",
    ],
  },
  empathetic: {
    greeting: [
      "How are you feeling today? I'm here for you 💝",
      "Welcome back! Remember, it's okay to take things at your own pace 🌸",
      "I'm so glad you're here. Let's make today a good one together 🤗",
    ],
    encouragement: [
      "I understand this is challenging. You're doing your best, and that's enough.",
      "It's okay to feel overwhelmed. Let's take this one step at a time.",
      "Remember to be kind to yourself. You're making progress, even if it doesn't feel like it.",
    ],
    taskComplete: [
      "I'm so proud of you! You did it! 🌟",
      "You should feel really good about this accomplishment 💖",
      "Look at you go! You're doing amazing things! 🌈",
    ],
  },
  analytical: {
    greeting: [
      "Ready to optimize your productivity? Let's analyze your goals 📊",
      "Time to strategize. What's our primary objective today? 🎯",
      "Let's review your progress and plan the most efficient path forward 📈",
    ],
    encouragement: [
      "Based on your patterns, you perform best when you break tasks into smaller chunks.",
      "Data shows you're 73% more productive at this time. Let's capitalize on that.",
      "Your completion rate has improved by 15% this week. Maintain this trajectory.",
    ],
    taskComplete: [
      "Excellent execution. Task completed with 100% efficiency ✅",
      "Objective achieved. Your productivity score has increased 📈",
      "Well done. This completion puts you ahead of schedule by 12% 🎯",
    ],
  },
  creative: {
    greeting: [
      "Let's paint today with the colors of productivity! 🎨",
      "Time to create something amazing! What masterpiece shall we work on? ✨",
      "Your creative energy is flowing! Let's channel it into something wonderful 🌟",
    ],
    encouragement: [
      "Think of each task as a brushstroke in your daily masterpiece!",
      "Sometimes the best ideas come when we approach things differently. Try a new angle!",
      "Let your imagination guide you - there's no wrong way to be productive!",
    ],
    taskComplete: [
      "Beautiful work! You've created something special today! 🎨",
      "That's a masterpiece of productivity! Bravo! 🌟",
      "You've added another brilliant chapter to your story! ✨",
    ],
  },
  stoic: {
    greeting: [
      "Focus on what you can control. Let's begin. 🗿",
      "The obstacle is the way. What challenges await us today? ⚔️",
      "Discipline equals freedom. Time to practice both. 🛡️",
    ],
    encouragement: [
      "The struggle is where character is forged. Embrace it.",
      "You cannot control the outcome, only your effort. Give your best.",
      "Every difficulty is an opportunity to practice virtue.",
    ],
    taskComplete: [
      "Well done. You've acted with discipline and purpose. 🗿",
      "Task complete. You've demonstrated excellent self-control. ⚔️",
      "You've conquered today's challenge. Tomorrow brings new opportunities. 🛡️",
    ],
  },
};

export function getAIResponse(
  input: string,
  personality: CoachPersonality,
  userProfile: UserProfile
): string {
  const responses = personalityResponses[personality];
  const inputLower = input.toLowerCase();
  
  // Determine response type based on input
  let responseType: keyof typeof responses = 'encouragement';
  
  if (inputLower.includes('hello') || inputLower.includes('hi') || inputLower.includes('hey')) {
    responseType = 'greeting';
  } else if (inputLower.includes('done') || inputLower.includes('completed') || inputLower.includes('finished')) {
    responseType = 'taskComplete';
  }
  
  // Get random response from the appropriate category
  const possibleResponses = responses[responseType];
  const response = possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
  
  // Add personalization based on user profile
  const personalizedSuffix = userProfile.currentStreak > 3 
    ? ` You're on a ${userProfile.currentStreak} day streak!` 
    : '';
  
  return response + personalizedSuffix;
}
