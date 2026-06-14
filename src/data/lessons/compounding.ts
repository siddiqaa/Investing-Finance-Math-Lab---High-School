import { LessonContent } from '../../types';

export const compounding: LessonContent = {
  id: 'compounding',
  title: 'Time Value of Money & Compound Growth',
  subtitle: 'Exponents, compound growth, backwards present value, and company valuation',
  mathTopic: 'Exponents, Percentages, Present Value, Net Present Value, and the Gordon Growth Model',
  equations: [
    'FV = PV \\times (1 + r)^n',
    'PV = \\sum_{t=1}^{\\infty} \\frac{CF_t}{(1 + r)^t}',
    'P_0 = \\frac{D_0 (1 + g)}{r - g} \\quad (r > g)'
  ],
  description: 'Understand the power of exponents and percentages through compound growth. Discover why a dollar today is worth more than a dollar tomorrow, and learn how to work backwards to find present value and value growing dividends.',
  introduction: `The story of modern finance begins not with a bank, but with a simple, quiet realization: time is a physical dimension of value. In our everyday lives, we measure things in height, width, and weight. But in the world of money, there is a fourth dimension—Time. If you have a chocolate bar today, you can eat it now. If I promise you a chocolate bar in ten years, that promise is significantly less useful. You can't satisfy your hunger today with a promise from the future. This intuitive gap between "Having it Now" and "Having it Later" is the entire reason the financial world exists.

Imagine you are a sea merchant in the 1700s. You have a ship full of spice, but it will take two years to sail across the ocean and return with gold. During those two years, your family still needs to eat, and your crew still needs to be paid. You have wealth in the *future*, but you are poor in the *present*. To bridge that gap, you might go to a lender. You ask for gold now, promising to pay back even more gold when your ship returns. The lender isn't just "charging you a fee"; they are giving up their own ability to use that gold today. They are selling you their *patience*. The price of that patience is what we call **Interest**.

At the high school level, we often learn about exponents in algebra class as abstract shapes on a graph. In this lab, you will see that exponents are the heartbeat of the global economy. When we talk about "Compound Interest," we are talking about a mathematical snowball effect. Most people think of growth as a straight line: you gain five dollars today, five dollars tomorrow, and five dollars the day after. That is linear growth. But compounding is different. It is growth that feeds on itself. When your interest starts earning its own interest, you have entered the realm of the exponential. 

Think back to the "Magic Penny" riddle. If a penny doubles every day, it feels like nothing is happening for three weeks. You're at day 20 and you only have a few thousand dollars—hardly enough to buy a nice used car. You might feel like the math has failed you. But in the final ten days, the curve turns vertical. This "hockey stick" shape is the secret to almost all long-term wealth. It is also the reason why starting to save at age 15 is mathematically vastly more powerful than starting at age 35. You aren't just saving more money; you are giving the "Magic Penny" more days to double. Every day you wait to begin is a day you are cutting off the most powerful part of your own exponential growth curve.

But this math doesn't just work forward; it works backward, too. Businesses use this logic to decide if they should build a new factory or launch a new video game. They look at all the money they expect to make in the next ten years and "shrink" it back to today's value. This process, called **Discounting**, allows us to put a price tag on the future. It tells us that a billion dollars in the year 2050 might only be worth a few million dollars today. Understanding this "Reverse Math" is how professional investors avoid overpaying for hype and focus on real, tangible value.

In this first unit, we will master both directions: building the future with compounding and valuing it today with discounting. We will learn that the "Time Value of Money" isn't just a formula on a chalkboard; it is the fundamental physics of how wealth behaves across the years. Whether you are planning for college, starting a business, or just curious about how global markets work, everything begins with understanding that a dollar is not just a piece of paper—it is a seed that, given enough time and the right interest rate, can grow into a forest. By the end of this lab, you will not only be able to calculate the future; you will be able to see it.`,
  fullText: [
    '**The Hook: Imagine a Magic Penny**\nIf I offered you a choice between \\$1,000,000 in cash today or a single penny that doubles in value every day for 30 days, which would you take? Most people instinctively grab the million. But look at the math: on day 10, your penny is only worth \\$5.12. On day 20, it is \\$5,242. But on day 30, that single penny has exploded into **\\$5,368,709.12**. This is the "magic" of exponential growth, and it is the most powerful force in the financial universe.',
    '1. **The Time Value of Money (TVM)**\nThe absolute foundation of finance is that a dollar today is worth more than a dollar tomorrow. This isn\'t because of inflation (though that matters too), but because of **Opportunity Cost**. If you have \\$100 today, you can put it to work. You can buy a lawnmower to start a business, or you can lend it to a bank to earn interest. By waiting until next year to receive that \\$100, you are losing a full year of potential productivity.',
    'If you invest a Present Value $PV$ at a yearly growth rate $r$, in $n$ years your money grows to a Future Value:\n$FV = PV \\times (1 + r)^n$',
    '**Worked Example — The Power of Compounding:**\nSuppose you invest \\$10,000 at a 7% annual return. Watch what happens as your *interest starts earning its own interest*:',
    'YEARS_TABLE|Years | Calculation | Final Value\n10 | $10,000 \\times (1.07)^{10}$ | \\$19,672\n20 | $10,000 \\times (1.07)^{20}$ | \\$38,697\n30 | $10,000 \\times (1.07)^{30}$ | \\$76,123',
    'Notice the "Snowball Effect": the jump from year 20 to year 30 (\\$37,000) is nearly four times larger than the jump from year 0 to year 10 (\\$9,000). Compounding reward the patient. The math tells us that the most important variable in your wealth isn\'t how much you start with, but how *long* you let it grow.',
    '⚠️ **Common Mistake:** Students often think 7% per year for 10 years = 70% total growth. In Reality, it\'s $(1.07)^{10} - 1 \\approx 96.7\\%$ total growth. You aren\'t just adding 7% ten times; you are growing by 1.07x ten times. Always multiply growth factors — never add them.',
    '2. **Discounting: Thinking in Reverse**\nIn finance, we often need to look at a future promise and figure out what it\'s worth *now*. If a company promises to pay you \\$10,000 in ten years, you shouldn\'t value it at \\$10,000 because you have to wait for it. We "discount" that future value to find its equivalent today.',
    'We flip the compounding formula using algebra:\n$PV = \\frac{FV}{(1 + r)^n}$\nThis is the "Price Tag" of the future. The higher the interest rate (or risk), the more we "shrink" the future value back to the present.',
    '**Real-World Problem — The Lottery Dilemma:**\nYou win a lottery. You can take either:\n- Option A: \\$1,000,000 today\n- Option B: \\$1,300,000 paid in 5 years',
    'Which should you choose? It depends on your **Discount Rate**. \n- At $r = 5\\%$: $PV_B = \\frac{1{,}300{,}000}{(1.05)^5} \\approx \\$1{,}018{,}800$. Option B is better.\n- At $r = 8\\%$: $PV_B = \\frac{1{,}300{,}000}{(1.08)^5} \\approx \\$885{,}000$. Option A wins.',
    'The "right" value of a future payment isn\'t fixed; it changes based on what else you could do with the money in the meantime.',
    '3. **Net Present Value (NPV): Valuing a Stream**\nMost investments aren\'t just one payment; they are a "stream" of payments over years (like a lemonade stand, a rental property, or a giant tech company). By discounting *every* individual future payment and adding them all up, we find the **Net Present Value (NPV)**. This is the "Holy Grail" of valuation math.',
    '$NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t}$',
    '**Worked Example — The Lemonade Stand Valuation:**\nYour friend\'s lemonade stand earns \\$500 in profit every year for 5 years, then closes. What is this business worth today if your required return is $10\\%$?',
    'STAND_TABLE|Year | Cash Flow | Discount Factor | Present Value\n1 | \\$500 | $\\div 1.10^1 = 0.909$ | \\$454.50\n2 | \\$500 | $\\div 1.10^2 = 0.826$ | \\$413.00\n3 | \\$500 | $\\div 1.10^3 = 0.751$ | \\$375.50\n4 | \\$500 | $\\div 1.10^4 = 0.683$ | \\$341.55\n5 | \\$500 | $\\div 1.10^5 = 0.621$ | \\$310.45\nTotal NPV | | | \\$1,895.00',
    'Even though the stand pays out \\$2,500 total, it is only "worth" \\$1,895 today. If your friend asks for \\$2,000 to buy the business, the math says: **No.** The price is higher than the value.',
    '4. **The Gordon Growth Model**\nWhat if the business never closes? A mature company like Coca-Cola pays a dividend that grows slightly every year, forever. We can value this infinite stream with a surprisingly simple formula:\n$P_0 = \\frac{D_0 \\times (1 + g)}{r - g} \\qquad \\text{(requires } r > g \\text{)}$',
    '**Why "r - g" is so sensitive:**\nImagine a stock paying a \\$2 dividend. If you require 10% ($r$) and it grows at 5% ($g$), the price is \\$40. But if growth picks up to 8%, the denominator ($r-g$) shrinks from 5% to 2%, and the price **triples to \\$100**. This is why the stock market goes crazy when a company changes its "growth guidance" by even 1% — the math of infinity makes small changes have massive impact.'
  ],
  quizzes: [
    {
      id: 'c1',
      question: 'If someone offers to pay you \\$1,000 in 5 years, and your discount rate ($r$) is 5%, what is this promise worth to you today?',
      options: [
        'Approximately \\$783.53',
        'Exactly \\$1,000',
        'Exactly \\$500',
        'Approximately \\$1,276.28'
      ],
      correctIndex: 0,
      explanation: 'Using the backward-discounting algebraic formula: $PV = FV / (1 + r)^n$. Here, $FV = \\$1,000$, $r = 0.05$, and $n = 5$. So, $PV = 1,000 / (1.05)^5 \\approx 1,000 / 1.27628 \\approx \\$783.53$.',
      hint: 'Apply the formula $PV = FV / (1 + r)^n$ with $FV = 1000$, $r = 0.05$, and $n = 5$.'
    },
    {
      id: 'c2',
      question: 'Under the Gordon Growth Model, if a company pays a dividend of \\$2.00 next year ($D_1$) and this dividend is expected to grow at 3% forever, what is its stock value if your required return ($r$) is 8%?',
      options: [
        '\\$40.00',
        '\\$20.00',
        '\\$25.00',
        '\\$100.00'
      ],
      correctIndex: 0,
      explanation: 'The Gordon Growth Model gives the stock price as $P_0 = D_1 / (r - g)$. Substituting $D_1 = \\$2.00$, $r = 0.08$, and $g = 0.03$, we get $P_0 = 2 / (0.08 - 0.03) = 2 / 0.05 = \\$40.00$.',
      hint: 'Use the formula $P_0 = D_1 / (r - g)$, where next year\'s dividend $D_1$ has already factored in the growth.'
    },
    {
      id: 'c3',
      question: 'What is the primary conceptual meaning of Net Present Value (NPV) in investment math?',
      options: [
        'It is the total estimated value of an investment today, found by adding up all its future cash payments after adjusting them back to today\'s dollar value',
        'It is the count of how many years it takes to get your original cash investment back',
        'It is the average of all future cash flows without adjusting for interest rates',
        'It is the final future value of an investment if there was no inflation'
      ],
      correctIndex: 0,
      explanation: 'NPV looks at all future cash flows, discounts them to their equivalent value today (Present Value), and sums them up. This lets you compare what an investment costs today against what it is worth today.',
      hint: 'Think about bringing all future payments back to the present and adding them up.'
    }
  ]
};
