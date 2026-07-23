import { LessonContent } from '../../types';

export const stockBridge: LessonContent = {
  id: 'stockBridge',
  title: 'Bridging to Businesses: Why We Invest in Stocks',
  subtitle: 'Fractional ownership, beating the bank rate, and productive assets',
  mathTopic: 'Equity Risk-Return Spread and Compounding Differences',
  equations: [
    '\\text{Average Stock Market Return} \\approx 8\\% - 10\\%',
    '\\text{Bank Safe Rate} \\approx 3\\% - 5\\%',
    '\\text{Growth Spread} = r_{\\text{stock}} - r_{\\text{bank}}'
  ],
  description: 'Why sit on a safe bank rate when you can own a piece of the companies shaping the future? Discover the math of fractional ownership and why stocks are the ultimate vehicle to outpace inflation and compound true wealth.',
  introduction: `In Unit 1.5, we looked at how bank rates (like High-Yield Savings Accounts and CDs) provide a secure benchmark of around $3\\%$ to $5\\%$. That is a great way to protect your money. But what if you want to grow your wealth over the long term to buy a house, fund college, or build real financial independence?

To outpace the steady grind of inflation and grow your money faster, you have to transition from being a **lender** (depositing cash in a bank) to an **owner**. This is where **stocks** come in.

A stock is not a dynamic ticket for a casino game or a line on a flashing green screen. A stock is **fractional ownership** of a real business—like Apple, Nike, or Spotify. In this unit, we will learn why businesses can return more than a bank, and how a small difference in the interest rate $r$ leads to breathtaking gaps in wealth over time. This lays the perfect foundation before we learn how to calculate what a stock is actually worth.`,
  fullText: [
    '**1. Stocks as Fractional Ownership**\nWhen you buy a single share of a company, you are purchasing a tiny, legal slice of that company\'s assets and future profits. If a company has 1 million total shares, and you buy 1 share, you own exactly $1 / 1{,}000{,}000$ of that entire business!\n\nBecause you are an owner, if the business sells more products, increases its profits, or invents the next big technology, the value of your tiny slice grows. This is why stocks are called **equity**—they represent actual, tangible value in productive enterprises.',
    '2. **Why Businesses Can Return More Than Banks**\nWhy does a stock index historically return about **8% to 10%** per year, while a bank CD might only pay **4.5%**?\n\nIt comes down to productive work. A bank is a middleman: they take your money, pay you a low interest rate, and then turn around to lend that money to businesses at a higher rate. Businesses take those loans (and your investment cash) to hire smart engineers, build factories, ship products, and make sales. Because businesses are actively creating new value and solving problems, their rate of growth ($r_{\\text{stock}}$) is naturally designed to outpace the simple passive rent fee paid by a bank ($r_{\\text{bank}}$).',
    '3. **The Power of the Rate Spread (r_stock vs. r_bank)**\nEven a seemingly small difference in your rate—like earning **9%** in stocks instead of **4%** in a savings account—results in mind-boggling differences when compounded over decades. This is the **Growth Spread**.\n\nLet\'s compare investing \\$1,000 at a bank rate of $4\\%$ versus a stock index averaging $9\\%$ over 30 years:\n\n- **Bank Savings Account ($r = 4\\%$):**\n$FV_{\\text{bank}} = \\$1{,}000 \\times (1 + 0.04)^{30} \\approx \\$3{,}243$\n\n- **Stock Market Investment ($r = 9\\%$):**\n$FV_{\\text{stock}} = \\$1{,}000 \\times (1 + 0.09)^{30} \\approx \\$13{,}268$\n\nBy choosing ownership over safe lending, your wealth grew to be **over four times larger**! Over a long timeline, the stock market\'s higher compounding rate is the ultimate weapon to grow your savings.',
    '**Summary Check — Transitioning Your Mindset:**\n- **Banks** are excellent for safe, short-term goals because they guarantee your principal.\n- **Stocks** are designed for long-term compounding because they let you participate directly in the profits of growing businesses.\n- **The Rule of Ownership:** In the long run, owners who take calculated business risks make far more than lenders who seek complete safety.'
  ],
  quizzes: [
    {
      id: 'sb1',
      question: 'When you buy a share of a stock, what are you actually buying?',
      options: [
        'A short-term loan contract where the company promises to pay you back with interest',
        'A tiny piece of legal ownership in a real, living business, sharing in its assets and future profits',
        'A lottery ticket that depends entirely on whether other buyers get lucky',
        'A digital token that is not backed by any real-world assets'
      ],
      correctIndex: 1,
      explanation: 'Buying a stock makes you a part-owner of the company. You own a fraction of everything they make, build, and earn. That is why stocks represent real productive ownership, unlike cash or simple bank contracts.',
      hint: 'Remember what "equity" means. It translates to real fractional ownership of a business.'
    },
    {
      id: 'sb2',
      question: 'Why can businesses and stock markets historically offer a higher average annual return ($r \\approx 9\\%$) than a safe bank savings account ($r \\approx 4\\%$)?',
      options: [
        'Because banks are corrupt and steal the extra profits',
        'Because businesses actively create new value, hire people, sell products, and earn profits, which can grow much faster than simple bank interest rates',
        'Because the stock market is regulated to always guarantee a 9% return by law',
        'Because businesses have fewer physical buildings than banks'
      ],
      correctIndex: 1,
      explanation: 'A business is a productive enterprise. By creating new products, cutting costs, and growing sales, companies build real-world value. Because of this active, wealth-generating behavior, business growth has historically outpaced the passive lending rates of banks.',
      hint: 'Think about who is doing the active work to create new products and sell them.'
    },
    {
      id: 'sb3',
      question: 'Imagine you invest \\$1,000 for 25 years. Let\'s look at how a 5% "spread" in compound interest changes your future value. At a 4% bank rate, your money grows to \\$2,666. At a 9% stock rate, your money grows to \\$8,623. How much extra wealth did ownership create compared to safe banking?',
      options: [
        '\\$1,000 extra',
        '\\$2,666 extra',
        '\\$5,957 extra',
        '\\$8,623 extra'
      ],
      correctIndex: 2, // 8623 - 2666 = 5957
      explanation: 'By subtracting the two future values, we find the extra wealth generated by the higher compound rate: $\\$8{,}623 - \\$2{,}666 = \\$5{,}957$. Earning a 9% rate instead of 4% earned you nearly $6{,}000$ of extra compounding money!',
      hint: 'Subtract the bank future value ($2,666$) from the stock market future value ($8,623$).'
    }
  ]
};
