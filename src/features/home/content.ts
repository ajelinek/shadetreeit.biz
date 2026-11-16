export const business = {
  name: 'ShadeTree.IT LLC',
  owner: 'Adam Jelinek',
  phone: '309-750-1461',
  phoneHref: 'tel:+13097501461',
  email: 'adam@shadetreeit.biz',
  linkedIn: 'https://www.linkedin.com/in/adam-jelinek/',
  medium: 'https://medium.com/@shadetreeit',
  description: 'Practical AI, software, data, and leadership guidance for small businesses ready to work smarter and grow.',
} as const;

export const services = [
  { number: '01', title: 'AI consulting & training', description: 'Make sense of AI and put it to work where it matters. From practical guidance to hands-on training, build confidence using the tools that fit your business.' },
  { number: '02', title: 'Custom software & better processes', description: 'Spend less time on repetitive work. Improve back-office processes and build custom tools that fit the way your business actually runs.' },
  { number: '03', title: 'Data & business insights', description: 'Bring your data together with thoughtful pipelines and management, then turn it into clear reporting and insights for better decisions.' },
  { number: '04', title: 'Leadership training & coaching', description: 'Grow as a leader while you grow your business. Develop the habits, perspective, and confidence to lead your people forward.' },
] as const;
