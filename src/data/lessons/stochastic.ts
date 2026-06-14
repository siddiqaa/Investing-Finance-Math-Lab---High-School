import { LessonContent } from '../../types';

export const stochastic: LessonContent = {
  id: 'stochastic',
  title: 'Stock Prices & Randomness',
  subtitle: 'Percentage changes, random walks, and volatility drag',
  mathTopic: 'Percentages, Multiplicative Returns, Random Walks, and Volatility Drag',
  equations: [
    '\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}',
    'S_t = S_{t-1} \\times (1 + r_t)',
    'S_T = S_0 \\times (1.10)^5 \\times (0.90)^5'
  ],
  description: 'Stock prices change unpredictably from day to day because of new, unexpected information. Learn how we model stock trends as random walks, how to compute rates of return, and how wild swings can create a drag on wealth.',
  introduction: `If you look at a stock chart for more than five minutes, you will likely see a jagged, chaotic line that looks like the heartbeat of a person running a marathon. It seems to move without rhyme or reason. For decades, mathematicians and economists have tried to figure out if there is a predictable "code" hidden within those jags. Some people think they see patterns—triangles, head-and-shoulders, or waves. But the math tells a different story. The jags are not a code; they are the sound of the world's surprises being shouted into a microphone in real time. Each tick up or down is a response to a new event that was completely unexpected just seconds before.

Imagine you are standing on a street corner, watching people walk by. If you see someone take a step to the left, does that mean their next step will be to the left? Probably not. They might see a friend and turn right, or see a puddle and jump over it. Their path is a series of independent decisions reacting to new information. This is what mathematicians call a **Random Walk**. In the stock market, the "steps" are price changes. A company might announce a breakthrough in clean energy (step up), or a factory might suffer a fire (step down). Because you cannot predict the news before it happens, you cannot predict the next step in the stock price. If you could, it wouldn't be "news" anymore—it would already be common knowledge.

This leads us to a controversial idea called the Efficient Market Hypothesis. It sounds fancy, but the logic is simple: if everyone knows a stock is going to go up tomorrow, they will all try to buy it *today*. Their buying will push the price up immediately. Therefore, the price you see on your screen right now already includes everything the world knows. The only thing that can move the price next is something the world *doesn't* know yet. This is why the market feels so random—it is a machine that instantly digests information and leaves only the unpredictable leftovers for the future. It is a system built by millions of people all trying to be the first to know something new, which ironically makes the price reflect everything known.

However, there is a hidden danger in this randomness that most people don't see until it's too late. It is called **Volatility**. In popular culture, we use the word "volatile" to describe someone with a temper or a weather system that changes quickly. In finance, volatility is measured by how much the jags on the chart swing up and down. You might think that as long as a stock goes up as much as it goes down, you're fine. But the math of percentages is cruel. As you will see in our "Coin Flip Portfolio" experiment, if you lose 10% and then gain 10%, you aren't back to zero—you're actually poorer than when you started. Volatility is not just a measure of excitement; it is a weight that drags on your wealth.

This is the "Volatility Drag." The more chaotic a stock's path, the harder it has to work just to stay even. It's like trying to run a race across a trampoline versus a paved track. Every bounce up and down steals some of your forward momentum. In this unit, we are going to dive into the mathematical mechanics of these random movements. We will learn how to measure them, how to simulate them using simple coin flips, and why staying "Steady" is often a more successful math strategy than being "Wild," even if the two paths seem to lead to the same destination on paper. We are going to learn how to find order in the jags and understand the hidden physics of market chaos. Understanding randomness is the first step toward surviving it. By mastering these patterns, you move from being a passenger on the "Drunkard's Walk" to being an observer who understands the tilt of the alley.`,
  fullText: [
    '**The Hook: The Drunkard’s Walk**\nImagine a drunk person walking down a narrow alley. Every step they take is random — they might stumble left or trip right. If you watch them take one step, you have no idea where they will be next. But if you watch them for an hour, and the alley is slightly tilted downhill, you can bet they will eventually end up at the bottom. This "Random Walk with Drift" is exactly how mathematicians model the stock market.',
    '1. **Percentage Returns: Measuring the Stumble**\nWe don\'t measure stocks in dollars; we measure them in percentages. A \\$1 move is huge for a \\$10 stock (10%), but tiny for a \\$1,000 stock (0.1%).\n$\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}$',
    '**Real-World Hook: What causes the stumble?**\nStocks move because of **Surprises**. If a company announces \\$1 Billion in profit, and the market expected \\$1 Billion, the price won\'t move! The news was already "priced in." The price only jumps if there is a gap between reality and expectation.',
    '2. **The Asymmetry Trap**\nA critical feature of stock math is that returns are **Multiplicative**, not additive. This leads to a counter-intuitive trap.',
    '**Worked Example:**\nSuppose a stock starts at \\$100. It rises 10% on Monday, then falls 10% on Tuesday. Where are you?\n- Monday close: $\\$100 \\times 1.10 = \\$110$\n- Tuesday close: $\\$110 \\times 0.90 = \\$99$\n\nYou are down \\$1! Percentage losses bite harder than gains. To recover from a 10% drop, you need an 11.1% gain. To recover from a 50% drop (like in a crash), you need a **100% gain** just to get back to even. This is why preserving your capital is the #1 rule of professional investing.',
    '3. **The Random Walk and Volatility Drag**\nBecause of the Asymmetry Trap, if a stock just bounces up and down randomly over time, it will slowly lose value even if the "average" return is zero. This is called **Volatility Drag**.',
    '**Worked Example — The Coin Flip Portfolio:**\nStart at \\$100. Flip a coin 10 times. Heads = +10%. Tails = -10%. (Assume 5 heads, 5 tails).\n$\\$100 \\times (1.10)^5 \\times (0.90)^5 = \\$95.10$',
    'Even though you got a perfectly "fair" set of coin flips, you lost 5% of your money. The "choppiness" of the market is a hidden tax on your wealth.',
    '4. **Why Volatility Matters (The Drag Calculation)**\nTwo investors can have the same "Average Return" but end up with very different bank accounts.',
    'VOLATILITY_TABLE|Year | Investor A (Steady) | Investor B (Wild)\n1 | +10% | +40%\n2 | +10% | -20%\n3 | +10% | +40%\n4 | +10% | -20%\nAverage Return | 10% | 10%\nFinal Balance | \\$146.41 | \\$125.44',
    '**Investor B lost \\$20 compared to Investor A**, even though they averaged the same 10%. The lesson: Stability is literally worth money. The more a stock "swings," the more return it *needs* just to keep up with a steady competitor.'
  ],
  quizzes: [
    {
      id: 's1',
      question: 'If a stock’s share price starts at \\$100, increases by 20% on Monday, and then falls by 20% on Tuesday, what is its final price?',
      options: [
        '\\$96.00',
        '\\$100.00',
        '\\$104.00',
        '\\$80.00'
      ],
      correctIndex: 0,
      explanation: 'On Monday, the stock goes from \\$100 to \\$120 ($\\$100 \\times 1.20$). On Tuesday, the stock drops by 20% of its new price, which is a drop of \\$24 ($\\$120 \\times 0.20$). The final price is $\\$120 - \\$24 = \\$96.00$.',
      hint: 'Remember that Tuesday\'s percentage change applies to Monday\'s ending price, not the original \\$100.'
    },
    {
      id: 's2',
      question: 'What is the core idea of a stock price modeled as a "random walk"?',
      options: [
        'Each day’s stock price move is independent and unpredictable, meaning past prices cannot predict future moves',
        'Stock prices always move up on sunny days and down on rainy days',
        'Stock prices follow a perfectly predictable repetitive wave pattern over time',
        'The stock market is completely rigged and prices are set by a central computer'
      ],
      correctIndex: 0,
      explanation: 'A random walk maps price moves as independent random steps. Since each step is triggered by new, surprises-only information, the path itself is fundamentally unpredictable from yesterday\'s trend.',
      hint: 'Think about coin flips where previous flips don\'t affect the next flip.'
    },
    {
      id: 's3',
      question: 'How does high volatility (wild fluctuations) create a "drag" on compounding wealth?',
      options: [
        'Large downs require much larger percentage gains to recover from, making steady growth mathematically superior for the same average return',
        'Wild swings increase transaction taxable fees automatically on the exchange',
        'Volatility makes stock splits happen too frequently',
        'It makes interest rates rise automatically'
      ],
      correctIndex: 0,
      explanation: 'Since a drop of 50% requires a 100% gain to break even, wild fluctuations have a built-in mathematical handicap. The larger the swings, the lower the actual geometric compounded growth is relative to a direct arithmetic mean.',
      hint: 'Think about how hard it is to work backwards and recover after a massive portfolio drop.'
    }
  ]
};
