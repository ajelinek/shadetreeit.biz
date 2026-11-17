export const business = {
  name: 'ShadeTree.IT LLC',
  owner: 'Adam Jelinek',
  phone: '309-750-1461',
  phoneHref: 'tel:+13097501461',
  email: 'adam@shadetreeit.biz',
  emailHref: 'mailto:adam@shadetreeit.biz?subject=Hello%20from%20shadetreeit.biz',
  partnerEmailHref: 'mailto:adam@shadetreeit.biz?subject=Working%20alongside%20my%20clients',
  linkedIn: 'https://www.linkedin.com/in/adam-jelinek/',
  medium: 'https://medium.com/@shadetreeit',
  description: 'Practical AI, software, data, and leadership guidance for small businesses ready to work smarter and grow.',
} as const;

export const services = [
  {
    number: '01',
    title: 'AI consulting & training',
    description: 'Find where AI actually helps your business, and build the confidence to use it well.',
    painPoints: [
      "“I know we should be using AI, but I don't know where to start.”",
      "“Is it safe to put customer information into these tools?”",
      "“We tried it, but I don't trust what it gives us.”",
    ],
  },
  {
    number: '02',
    title: 'Custom software & better processes',
    description: 'Spend less time on repetitive work with better processes and tools that fit how you run.',
    painPoints: [
      "“A job falls through the cracks between the quote and the invoice.”",
      "“We type the same information into two or three places.”",
      "“Nothing off the shelf fits the way we actually work.”",
    ],
  },
  {
    number: '03',
    title: 'Data & business insights',
    description: 'Connect your data and turn it into clear reports that support better decisions.',
    painPoints: [
      "“I can't tell which jobs or customers actually make us money.”",
      "“Someone spends every Monday rebuilding the same spreadsheet.”",
      "“I find out about problems weeks after they happen.”",
    ],
  },
  {
    number: '04',
    title: 'Leadership training & executive coaching',
    description: 'Build the habits and confidence to lead your people as the business grows.',
    painPoints: [
      "“Everything still runs through me.”",
      "“I promoted my best employee, and now they're struggling as a manager.”",
      "“Our meetings go in circles, and the same issues keep coming back.”",
    ],
  },
] as const;

export const waysToWork = [
  {
    title: 'Fractional CTO / advisor',
    description: 'For a small tech team facing a project bigger than it has handled before. I guide the big decisions, strengthen your team, then hand the work off to them.',
  },
  {
    title: 'Hands-on builder',
    description: 'I design, build, and support the software, process, or data work myself, or alongside your team.',
  },
] as const;

export const steps = [
  { number: '01', title: 'Talk it through', description: "Tell me what's getting in the way." },
  { number: '02', title: 'Start small', description: 'We pick one clear first project.' },
  { number: '03', title: 'Build it together', description: "Your team learns to run it. I'll stay on if you need me." },
] as const;
