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
  introduction: `The origins of the options market date back over two thousand years to ancient Greece and a philosopher named Thales of Miletus. Thales was a brilliant thinker, but he was poor, and people often teased him for it. They said that if his philosophy was so great, why wasn't he rich? To prove them wrong, Thales used his knowledge of meteorology to predict that the next olive harvest would be massive. But he didn't have the money to buy all the olive presses in town. Instead, he went to the owners of the presses and paid them a small fee for the *right* to rent their presses at a fixed price when the harvest came. Because the owners didn't expect a big harvest, they were happy to take his small fee. When the harvest turned out to be spectacular, everyone needed a press, and Thales owned the exclusive right to rent them out. he made a fortune, proving that his "math" was indeed worth something.

This is the birth of the **Option**. In its simplest form, an option is the price of "Maybe." It is a contract that gives you a right, but not an obligation. In the everyday world, we use options all the time without realizing it. When you pay for a refundable plane ticket, you are buying an option. You have the right to get your money back, but you aren't forced to use it. If your plans change, you use the option. If your plans stay the same, you let the "refundable" part of the ticket expire—you don't need it. That extra amount you paid for the refundability is the "Option Premium." It is the cost of flexibility, and it turns out that flexibility is one of the most valuable commodities in the world.

In finance, there are two main types of options: **Calls** and **Puts**. A Call option is based on hope—the hope that a stock will go up. It gives you the right to buy a stock at a fixed price. If the stock explodes in value, your right to buy it "cheap" becomes incredibly valuable. It is like having a coupon for a luxury item that suddenly becomes popular. A Put option is based on protection—the need to know the worst-case scenario. It is like an insurance policy for your stocks. If the stock market crashes, a Put option gives you the right to sell your shares at a high price, even if the rest of the world is selling them for pennies. In many ways, the options market is the insurance industry of the financial world, providing a safety net for billions of dollars in investments.

But why would anyone *sell* these rights? If I buy a Put to protect myself, someone else has to agree to take that risk. The answer is the **Premium**. The person selling the option gets paid upfront. They are like an insurance company: they take small payments from thousands of people, betting that most of those people will never actually need to use their "Insurance." But if a major event happens, the seller is on the hook. This tug-of-war between the Buyer (who wants a big move) and the Seller (who wants everything to stay quiet) is what creates the "Fair Price" of an option. It is a market where time itself is the most important factor, constantly ticking down toward a deadline.

In this unit, we will explore the algebra of these "Maybe" contracts. We will learn how to build payoff tables that show exactly how much an option is worth when the clock runs out. We will also meet "The Greeks"—Delta, Theta, and Vega—the mathematical tools that professional traders use to navigate this complex world. We are going to learn that while stocks are about the "Price Today," options are about the "Probability of Tomorrow." We'll see how Thales' ancient trick with the olive presses is still used today by the world's biggest hedge funds to protect billions of dollars and make surgical bets on the future. By the end of this lab, you will understand the deep math of inequalities and how to put a price on the unknown.`,
  fullText: [
    '**The Hook: The Ticket to the Big Game**\nImagine you want to go to a massive championship game, but you aren\'t sure if your team will make the finals. You find a broker who sells you a **Reservation Ticket**. This ticket costs \\$10, and it gives you the *right* to buy a stadium seat for \\$100 if your team makes it. \n\n- If your team makes the finals and tickets are selling for \\$500, your reservation is amazing! You buy for \\$100 and win big.\n- If your team loses and the stadium is empty, you just throw the \\$10 reservation away. You aren\'t *forced* to buy the seat.\n\nThis is exactly how an Option works. It is the price of "Maybe."',
    '1. **The Insurance Analogy**\nAn option is a contract that gives you a right, but not a requirement. \n- A **Call Option** is the right to *buy* (you want the price to go UP).\n- A **Put Option** is the right to *sell* (you want the price to go DOWN).\n\nThink of a Put Option like Car Insurance. You pay a small fee (premium). If your car (the stock) is fine, you "lose" the fee. but if the car is totaled, the insurance company pays you the full value. You pay for the certainty of a "floor" under your wealth.',
    '2. **The "Strike" and the "Expiration"**\nEvery option has a **Strike Price** (the price you are locked into) and an **Expiration Date** (the deadline).',
    '**Call Option Payoff Math:**\n$\\text{Call Payoff} = \\max(S_T - K, 0)$\n(Where $S_T$ is the final stock price and $K$ is the Strike).',
    'PAYOFF_CALL_TABLE|Stock Price ($S_T$) | Strike ($K$) | Your Payoff\n\\$40 | \\$50 | \\$0 (You walk away)\n\\$50 | \\$50 | \\$0 (At the money)\n\\$60 | \\$50 | \\$10 (In the money!)\n\\$100 | \\$50 | \\$50 (Jackpot)',
    '3. **Intrinsic Value vs. Time Value**\nWhy does an option cost \\$2 even when the stock is below the strike price? Because there is still **Time**. \n- **Intrinsic Value**: The profit you\'d make if you used the option *this second*.\n- **Time Value**: The market\'s bet that the stock *might* move in your favor before the deadline.',
    '$\\text{Total Price} = \\text{Intrinsic} + \\text{Time Value}$\n\nAs the clock ticks toward the deadline, the "Time Value" evaporates. This is called **Time Decay**. If you buy an option and the stock does nothing, you will lose money every single day just because time is running out.',
    '4. **The Greeks: The Dashboard of Risk**\nProfessional traders don\'t just look at the price; they look at "The Greeks" to see their exposure:',
    '- **Delta ($\\Delta$)**: The Sensitivity. If the stock moves \\$1, how much does the option move? (A Delta of 0.5 means a \\$0.50 move).\n- **Theta ($\\Theta$)**: The Thief. How much value is stolen from you every day by time passing?\n- **Vega**: The Fear. How much does the option price jump if the market gets "scared" and volatility rises?',
    '5. **Why Options Matter: Leverage & Hedging**\n- **Hedging**: Buying a Put to protect a stock you already own.\n- **Leverage**: Buying a Call instead of a stock. For the price of 1 share of Apple, you might be able to buy options that control 100 shares. This can lead to massive wins—or losing 100% of your money in a single day.'
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
