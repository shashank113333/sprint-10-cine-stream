import axios from 'axios';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();

const MOOD_FALLBACKS = [
  { keywords: ['action', 'fight', 'batman', 'thrill'], title: 'The Dark Knight' },
  { keywords: ['sad', 'cry', 'hope', 'emotional'], title: 'The Shawshank Redemption' },
  { keywords: ['space', 'sci-fi', 'future', 'mind'], title: 'Interstellar' },
  { keywords: ['dream', 'confusing', 'heist'], title: 'Inception' },
  { keywords: ['funny', 'laugh', 'comedy', 'deadpool'], title: 'Deadpool & Wolverine' },
  { keywords: ['music', 'drum', 'intense'], title: 'Whiplash' },
];

export const getMovieFromMood = async (moodText) => {
  if (!moodText || !moodText.trim()) {
    throw new Error('Please describe your mood or what you want to watch.');
  }

  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 5) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      const prompt = `Suggest ONE movie based on this mood: "${moodText.trim()}". Return ONLY the movie title as a plaintext string, without any quotes, markdown or explanations.`;

      const response = await axios.post(
        url,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { 'Content-Type': 'application/json' }, timeout: 8000 }
      );

      const rawTitle = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawTitle) {
        return rawTitle.replace(/[*#_`"]/g, '').replace(/\n.*/gs, '').trim();
      }
    } catch (err) {
      console.warn('Gemini API call failed, using heuristic fallback:', err);
    }
  }

  await new Promise((res) => setTimeout(res, 600));
  const lower = moodText.toLowerCase();
  for (const item of MOOD_FALLBACKS) {
    if (item.keywords.some((k) => lower.includes(k))) {
      return item.title;
    }
  }

  return 'Inception';
};