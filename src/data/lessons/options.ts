import { LessonContent } from '../../types';

export const options: LessonContent = {
  id: 'options',
  title: 'Options & The Price of a Guarantee',
  subtitle: 'Payoff tables, intrinsic values, and plain-English risk sensitivities',
  mathTopic: 'Inequalities, Option Payoffs, Inputs, and Plain-English Greeks',
  equations: [
    '\\text{Call Payoff} = \\max(S_T - K, 0)',
    '\\text{Put Payoff} = \\max(K - S_T, 0)',
    '\\text{Option Price} = \\text{Intrinsic Value} + \\text{Time Value}'
  ],
  description: 'An option is a contract that gives you the right to buy or sell a stock at a set price, like a financial insurance policy. Master option expiration payoffs and plain-English premium pricing factors.',
  fullText: [
    '1. **The Insurance Analogy**\nBefore touching any math, here\'s the core intuition: A **put option** is like car insurance.\n- You pay a **premium** upfront (the option price)\n- If nothing bad happens, you lose just the premium — the insurance wasn\'t "needed"\n- If disaster strikes (the stock crashes), you\'re protected — the option pays off\n\nJust like you don\'t buy car insurance hoping your car gets stolen, you buy a put option to protect against a stock loss you can\'t afford. The option\'s value comes from the guarantee it provides, not the expectation that disaster will happen.',
    '2. **Call Option Payoffs**\nA **Call Option** gives you the right — but not the obligation — to *buy* a stock at a set price $K$ (the "strike price") at a future date. The payoff at expiration is:\n$\\text{Call Payoff} = \\max(S_T - K, 0)$',
    'If the stock price $S_T$ is above the strike $K$, you exercise (buy cheap, sell at market). If it\'s below, you simply don\'t exercise — you lose only what you paid for the option.',
    'PAYOFF_CALL_TABLE|Stock Price at Expiration | Payoff Calculation | Your Payoff\n\\$30 | $\\max(30 - 50, 0)$ | \\$0\n\\$40 | $\\max(40 - 50, 0)$ | \\$0\n\\$50 | $\\max(50 - 50, 0)$ | \\$0\n\\$60 | $\\max(60 - 50, 0)$ | \\$10\n\\$70 | $\\max(70 - 50, 0)$ | \\$20',
    '**Breakeven Analysis:**\nIf you paid \\$3 for this call option, at what stock price do you actually profit?\n$\\text{Breakeven} = \\text{Strike} + \\text{Premium Paid} = \\$50 + \\$3 = \\$53$',
    'You need the stock above \\$53 to make money. Between \\$50 and \\$53, the option has value but not enough to cover what you paid for it.',
    '3. **Put Option Payoffs**\nA **Put Option** gives you the right to *sell* a stock at strike price $K$. Its payoff is:\n$\\text{Put Payoff} = \\max(K - S_T, 0)$',
    'PAYOFF_PUT_TABLE|Stock Price at Expiration | Payoff Calculation | Your Payoff\n\\$30 | $\\max(50 - 30, 0)$ | \\$20\n\\$40 | $\\max(50 - 40, 0)$ | \\$10\n\\$50 | $\\max(50 - 50, 0)$ | \\$0\n\\$60 | $\\max(50 - 60, 0)$ | \\$0\n\\$70 | $\\max(50 - 70, 0)$ | \\$0',
    'The put protects you against downside. Even if the stock falls to zero, the most you can lose is the premium you paid — your downside is capped.',
    '4. **Intrinsic Value vs. Time Value**\nAn option\'s total price has two components:\n- **Intrinsic Value**: What the option would be worth if it expired today (i.e., the payoff from the tables above)\n- **Time Value**: Extra value from the possibility that the stock could move further in your favor before expiration\n\n$\\text{Option Price} = \\text{Intrinsic Value} + \\text{Time Value}$',
    '**Worked Example:**\nA call option with a \\$50 strike, when the stock is at \\$55:\n- **Intrinsic Value** $= \\$55 - \\$50 = \\$5$\n- If the option trades at \\$7, then **Time Value** $= \\$7 - \\$5 = \\$2$\n\nThat \\$2 extra represents the market\'s belief that the stock could rise further before expiration. As the expiration date approaches, time value shrinks to zero — an option\'s clock is always ticking against you if you\'re the buyer.',
    '5. **Option Pricing Factors & The Greeks**\nFive inputs determine how much an option costs:',
    'FACTORS_TABLE|Input | Effect on Call Price | Intuition\n$\\uparrow$ Stock Price | Increases | Closer to / further above the strike\n$\\uparrow$ Strike Price | Decreases | Harder to profit\n$\\uparrow$ Time to Expiration | Increases | More time = more chances to move your way\n$\\uparrow$ Interest Rate | Slight Increase | Subtle — related to cost of carrying the stock\n$\\uparrow$ Volatility | Increases | More volatile = more chance of a big favorable move',
    '**The Greeks — Plain English First:**\n- **Delta ($\\Delta$)**: If the stock moves \\$1, how much does my option move?\n  - *Example*: A call with Delta $= 0.60$ gains about \\$0.60 when the stock rises \\$1.\n- **Vega**: If volatility increases by 1%, how much does my option gain?\n  - *Example*: Vega $= \\$0.15$ means a 1% vol increase adds \\$0.15 to the option\'s price.\n- **Theta ($\\Theta$)**: How much value does my option lose each day just from time passing?\n  - *Example*: Theta $= -\\$0.05$ means the option loses about \\$0.05 per day as expiration approaches — even if the stock doesn\'t move.',
    '**The Buyer vs. Seller Perspective:**\nEvery option buyer has a seller on the other side. The seller collects the premium upfront but takes on the risk. Sellers profit from Theta decay — they want time to pass with the stock staying still. Buyers need a big move to happen before time runs out. These competing interests are what set the option\'s fair price.'
  ],
  quizzes: [
    {
      id: 'o1',
      question: 'If you buy a Call option with a strike price of \\$100 ($K$), and the stock price ($S$) rises to \\$115 at expiration, what is your option’s payoff?',
      options: [
        '\\$15.00',
        '\\$0.00',
        '\\$100.00',
        '\\$115.00'
      ],
      correctIndex: 0,
      explanation: 'A Call option payoff is calculated as $\\max(S_T - K, 0)$. Here, stock price is \\$115 and strike is \\$100. So payoff is $\\max(115 - 100, 0) = \\max(15, 0) = \\$15.00$.',
      hint: 'Determine the gain you achieve from buying at the set Strike price of $100$ and immediately selling at the market price of $115$.'
    },
    {
      id: 'o2',
      question: 'In the options market, why is an option valued at MORE than its intrinsic value before expiration?',
      options: [
        'Because time remains, which offers a valuable probability that the stock will swing even further into profitable territory',
        'To cover the clearing costs and exchange transactions fees',
        'To offset the corporate dividend tax rates',
        'Because the law requires options to be priced higher than standard stock shares'
      ],
      correctIndex: 0,
      explanation: 'Time value represents the possibilities of future price swings. Even if an option has zero intrinsic value today (out of the money), it is worth something because the stock might move and make it profitable before the expiration date.',
      hint: 'Think about how a lottery ticket still has value before the drawing occurs, even if its current cash payout is zero.'
    },
    {
      id: 'o3',
      question: 'What is the plain-English meaning of the Greek risk sensitivity known as "Delta" ($\\Delta$)?',
      options: [
        'How much the option premium (price) is expected to change when the underlying stock price changes by \\$1.00',
        'The rate at which the option loses value each day purely because time is ticking away',
        'How sensitive the option is to changes in the market interest rate',
        'The total chance that the option expires completely worthless'
      ],
      correctIndex: 0,
      explanation: 'Delta ($\\Delta$) measures the option price sensitivity relative to the stock. A Delta of $0.60$ means that if the stock price moves up by \\$1.00, the option price is expected to rise by approximately \\$0.60.',
      hint: 'Focus on how the option value changes in response to small movements of the underlying stock share price.'
    }
  ]
};
