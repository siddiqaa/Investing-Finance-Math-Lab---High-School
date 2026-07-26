import { LessonContent } from '../../types';

export const rateSelection: LessonContent = {
  id: 'rateSelection',
  title: 'How is the Interest Rate (r) Selected?',
  subtitle: 'Lending to banks, savings accounts vs. CDs, and opportunity cost',
  mathTopic: 'Interest Rates, Opportunity Cost, and Savings benchmarks',
  equations: [
    'FV = P \\times (1 + r_{\\text{bank}})^n',
    '\\text{Opportunity Cost} = FV_{\\text{bank}} - P'
  ],
  description: 'Learn how the magical "interest rate" (r) is chosen in real life. For high schoolers and savers, we simplify this to the return you can get by putting your money in a savings account or a certificate of deposit at your local bank.',
  introduction: `In Unit 1, we learned that the interest rate, $r$, is like a mathematical time-machine slider. It grows our money forward into the future and shrinks promises backward to the present. But where does this mysterious "rate $r$" actually come from?

If you are a high school student, a first-time saver, or a family budgeting for a college fund, the simplest and most realistic way to think about the rate $r$ is by looking at your local bank.

When you put your money in a savings account, you aren't just "storing" it in a vault like a video game treasure chest. You are actually **lending** your money to the bank! The bank uses your money to make loans to other people (like helping a family buy a house or a local entrepreneur start a pizza shop). In return for letting them use your money, the bank pays you a rent fee. This fee is the interest rate, $r$.

In this lesson, we will explore how you choose the "right" $r$ when calculating future goals or making choices between spending today and saving for tomorrow. We will keep things incredibly simple, focusing on the safe interest rates you can actually get from a real bank, without getting lost in the scary jargon of Wall Street risk.`,
  fullText: [
    '**The Bank as Your Benchmark**\nThink of the bank\'s interest rate as your "baseline rate of patience." If you can walk down the street, put your money in a high-yield savings account or a Certificate of Deposit (CD) at a bank, and safely earn a guaranteed **5%** interest per year ($r = 0.05$), then **5%** becomes your ultimate point of comparison. This is what economists call your **Opportunity Cost**.',
    '1. **The Opportunity Cost Test**\nSuppose a friend asks to borrow \\$100 today and promises to pay you back \\$103 in one year. Your friend says, "That\'s a great deal! You get \\$3 of free profit!"\n\nIs it actually a good deal? Let\'s use our bank benchmark ($r = 5\\%$) to find out:\n\nIf you put that \\$100 in the bank at $5\\%$, in one year you will have:\n$FV = \\$100 \\times (1 + 0.05)^1 = \\$105$\n\nBy lending the money to your friend, you are *giving up* the opportunity to earn $5\\%$ at the bank. Because the bank would have given you \\$105, your friend\'s promise of \\$103 is actually a bad deal. You are mathematically losing \\$2 of potential wealth! The bank\'s rate $r$ is the barrier that any other opportunity has to beat.',
    '2. **Savings Accounts vs. Certificates of Deposit (CDs)**\nWhen you go to a bank, they will offer different rates ($r$) depending on how long you promise to leave your money untouched:\n\n- **High-Yield Savings Accounts:** These let you withdraw your money whenever you want (highly flexible). Because of this flexibility, they might pay a slightly lower rate, like **3% to 4%**.\n- **Certificates of Deposit (CDs):** A CD is a lock-box agreement. You promise the bank, "I will not touch this money for 1 year (or 2 years, or 5 years)." Because you are selling them your guaranteed patience, the bank will reward you with a higher rate, such as **5%** ($r = 0.05$).',
    '3. **Choosing the Right "r" for Your Goals**\nWhen you are doing calculations for your own life, how do you decide which rate $r$ to type into your formula?\n\n- **If you are planning a short-term goal (under 1 year):** Use a standard high-yield savings account rate (e.g., $r = 3.5\\%$).\n- **If you are planning a medium-term goal (2 to 5 years):** Use a Certificate of Deposit rate (e.g., $r = 4.5\\%$ or $5\\%$) because you can lock your money in safely for that duration.',
    '**Summary Check — The Three Golden Rules of the Rate r:**\n- **Rule 1:** The rate $r$ is the price of patience.\n- **Rule 2:** Always compare any investment to the safe rate you can get at a local bank.\n- **Rule 3:** If an option doesn\'t pay *more* than the bank rate, let the bank keep your money instead!'
  ],
  quizzes: [
    {
      id: 'r1',
      question: 'If a local bank offers a Certificate of Deposit (CD) paying 5% interest per year, what is the "Opportunity Cost" of keeping your \\$1,000 cash under your mattress for a year?',
      options: [
        '\\$0, because your mattress is safe and you didn\'t lose any cash',
        '\\$50, because that is the safe interest you *could* have earned if you gave it to the bank',
        '\\$1,000, because you might lose the mattress',
        '\\$5, because 5% of \\$1,000 is \\$5'
      ],
      correctIndex: 1,
      explanation: 'Opportunity cost is the value of the next best alternative that you give up. By hiding the cash under your mattress, you gave up the opportunity to earn 5% interest from the bank. 5% of \\$1,000 is \\$50 ($1{,}000 \\times 0.05 = 50$). Therefore, your opportunity cost is \\$50.',
      hint: 'Think about what you are missing out on by not putting that money to work at the bank rate of 5%.'
    },
    {
      id: 'r2',
      question: 'Why does a bank usually pay you a higher interest rate ($r$) for a 5-year Certificate of Deposit (CD) compared to a standard Savings Account?',
      options: [
        'Because 5-year CDs are only for wealthy adults',
        'Because the bank is rewarding you with a higher rate for committing to leave your money with them for a long, locked-in time',
        'Because the government forces banks to pay 10% on all accounts',
        'Because savings accounts are more expensive to print'
      ],
      correctIndex: 1,
      explanation: 'With a savings account, you can take your money out at any time, which means the bank has to keep cash ready for you. With a 5-year CD, you promise to leave your money locked in. This allows the bank to make long-term loans with confidence, so they reward your locked-in patience with a higher interest rate ($r$).',
      hint: 'Commitment and patience are valuable to the bank, so they pay a premium for them.'
    },
    {
      id: 'r3',
      question: 'Your cousin wants to start a small business and asks you to invest \\$500 today. He promises to pay you back \\$515 in one year. If a local bank CD pays a guaranteed 5% interest, is this cousin\'s offer a good deal mathematically?',
      options: [
        'Yes, because \\$515 is more than \\$500',
        'No, because the bank would pay you \\$525, which is guaranteed and has zero risk of business failure',
        'Yes, because family deals are always the most profitable',
        'No, because the cousin is offering 15% interest'
      ],
      correctIndex: 1,
      explanation: 'Let\'s calculate the alternatives:\n1) Cousin\'s offer: \\$515 in one year.\n2) Bank CD offer ($r=5\\%$): $500 \\times 1.05 = \\$525$ in one year.\n\nThe bank pays you more (\\$525) and has virtually zero risk, while your cousin\'s business could fail and pay you nothing. Since the cousin\'s payout (\\$515) is less than the bank\'s payout (\\$525), it is mathematically a bad deal.',
      hint: 'Calculate 5% of \\$500 and compare that future value to the \\$515 your cousin is offering.'
    }
  ]
};
