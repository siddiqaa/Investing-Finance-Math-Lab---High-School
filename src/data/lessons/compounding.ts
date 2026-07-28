import { LessonContent } from '../../types';

export const compounding: LessonContent = {
  id: 'compounding',
  title: 'Time Value of Money & Compound Growth',
  subtitle: 'Exponents, compound growth, backwards present value, and project valuation',
  mathTopic: 'Exponents, Percentages, Present Value, and Net Present Value',
  equations: [
    'FV = PV \\times (1 + r)^n',
    'PV = \\frac{FV}{(1 + r)^n}',
    'NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t}'
  ],
  description: 'Understand the power of exponents and percentages through compound growth. Discover why a dollar today is worth more than a dollar tomorrow, and learn how to work backwards to find present value and analyze investment cash flow streams.',
  introduction: `The story of modern finance begins not with a bank, but with a simple, quiet realization: time is a physical dimension of value. In our everyday lives, we measure things in height, width, and weight. But in the world of money, there is a fourth dimension—Time. If you have a chocolate bar today, you can eat it now. If I promise you a chocolate bar in ten years, that promise is significantly less useful. You can't satisfy your hunger today with a promise from the future. This intuitive gap between "Having it Now" and "Having it Later" is the entire reason the financial world exists.

Imagine you are a sea merchant in the 1700s. You have a ship full of spice, but it will take two years to sail across the ocean and return with gold. During those two years, your family still needs to eat, and your crew still needs to be paid. You have wealth in the <span className="italic">future</span>, but you are poor in the <span className="italic">present</span>. To bridge that gap, you might go to a lender. You ask for gold now, promising to pay back even more gold when your ship returns. The lender isn't just "charging you a fee"; they are giving up their own ability to use that gold today. They are selling you their <span className="italic">patience</span>. The price of that patience is what we call <span className="text-indigo-600 font-bold">Interest</span>.

At the high school level, we often learn about exponents in algebra class as abstract shapes on a graph. In this lab, you will see that exponents are the heartbeat of the global economy. When we talk about "Compound Interest," we are talking about a mathematical snowball effect. Most people think of growth as a straight line: you gain five dollars today, five dollars tomorrow, and five dollars the day after. That is linear growth. But compounding is different. It is growth that feeds on itself. When your interest starts earning its own interest, you have entered the realm of the exponential. 

Think back to the "Magic Penny" riddle. If a penny doubles every day, it feels like nothing is happening for three weeks. You're at day 20 and you only have a few thousand dollars—hardly enough to buy a nice used car. You might feel like the math has failed you. But in the final ten days, the curve turns vertical. This "hockey stick" shape is the secret to almost all long-term wealth. It is also the reason why starting to save at age 15 is mathematically vastly more powerful than starting at age 35. You aren't just saving more money; you are giving the "Magic Penny" more days to double. Every day you wait to begin is a day you are cutting off the most powerful part of your own exponential growth curve.

But this math doesn't just work forward; it works backward, too. Businesses use this logic to decide if they should build a new factory or launch a new video game. They look at all the money they expect to make in the next ten years and "shrink" it back to today's value. This process, called <span className="text-indigo-600 font-bold">Discounting</span>, allows us to put a price tag on the future. It tells us that a billion dollars in the year 2050 might only be worth a few million dollars today. Understanding this "Reverse Math" is how professional investors avoid overpaying for hype and focus on real, tangible value.

In this first unit, we will master both directions: building the future with compounding and valuing it today with discounting. We will learn that the "Time Value of Money" isn't just a formula on a chalkboard; it is the fundamental physics of how wealth behaves across the years. Whether you are planning for college, starting a business, or just curious about how global markets work, everything begins with understanding that a dollar is not just a piece of paper—it is a seed that, given enough time and the right interest rate, can grow into a forest. By the end of this lab, you will not only be able to calculate the future; you will be able to see it.`,
  fullText: [
    '<span className="text-indigo-600 font-bold">The Hook: Imagine a Magic Penny</span>\nIf I offered you a choice between \\$1,000,000 in cash today or a single penny that doubles in value every day for 30 days, which would you take? Most people instinctively grab the million. But look at the math: on day 10, your penny is only worth \\$5.12. On day 20, it is \\$5,242. But on day 30, that single penny has exploded into <span className="text-indigo-600 font-bold">\\$5,368,709.12</span>. This is the "magic" of exponential growth, and it is the most powerful force in the financial universe.',
    '1. <span className="text-indigo-600 font-bold">The Time Value of Money (TVM)</span>\nThe absolute foundation of finance is that a dollar today is worth more than a dollar tomorrow. This isn\'t because of inflation (though that matters too), but because of <span className="text-indigo-600 font-bold">Opportunity Cost</span>. If you have \\$100 today, you can put it to work. You can buy a lawnmower to start a business, or you can lend it to a bank to earn interest. By waiting until next year to receive that \\$100, you are losing a full year of potential productivity.',
    'If you invest a Present Value $PV$ at a yearly growth rate $r$, in $n$ years your money grows to a Future Value:\n$FV = PV \\times (1 + r)^n$',
    '<span className="text-indigo-600 font-bold">Worked Example — The Power of Compounding:</span>\nSuppose you invest \\$10,000 at a 7% annual return. Watch what happens as your <span className="italic">interest starts earning its own interest</span>:',
    'YEARS_TABLE|Years | Calculation | Final Value\n10 | $10,000 \\times (1.07)^{10}$ | \\$19,672\n20 | $10,000 \\times (1.07)^{20}$ | \\$38,697\n30 | $10,000 \\times (1.07)^{30}$ | \\$76,123',
    'Notice the "Snowball Effect": the jump from year 20 to year 30 (\\$37,000) is nearly four times larger than the jump from year 0 to year 10 (\\$9,000). Compounding reward the patient. The math tells us that the most important variable in your wealth isn\'t how much you start with, but how <span className="italic">long</span> you let it grow.',
    '⚠️ <span className="text-indigo-600 font-bold">Common Mistake:</span> Students often think 7% per year for 10 years = 70% total growth. In Reality, it\'s $(1.07)^{10} - 1 \\approx 96.7\\%$ total growth. You aren\'t just adding 7% ten times; you are growing by 1.07x ten times. Always multiply growth factors — never add them.',
    'KNOWLEDGE_CHECK_TVM|Initial Value: 5000, Annual Growth Rate: 6%',
    '2. <span className="text-indigo-600 font-bold">Discounting: Thinking in Reverse</span>\nIn finance, we often need to look at a future promise and figure out what it\'s worth <span className="italic">now</span>. If a company promises to pay you \\$10,000 in ten years, you shouldn\'t value it at \\$10,000 because you have to wait for it. We "discount" that future value to find its equivalent today.',
    'We flip the compounding formula using algebra:\n$PV = \\frac{FV}{(1 + r)^n}$\nThis is the "Price Tag" of the future. The higher the interest rate (or risk), the more we "shrink" the future value back to the present.',
    '<span className="text-indigo-600 font-bold">Real-World Problem — The Lottery Dilemma:</span>\nYou win a lottery. You can take either:\n- Option A: \\$1,000,000 today\n- Option B: \\$1,300,000 paid in 5 years',
    'Which should you choose? It depends on your <span className="text-indigo-600 font-bold">Discount Rate</span>. \n- At $r = 5\\%$: $PV_B = \\frac{1{,}300{,}000}{(1.05)^5} \\approx \\$1{,}018{,}800$. Option B is better.\n- At $r = 8\\%$: $PV_B = \\frac{1{,}300{,}000}{(1.08)^5} \\approx \\$885{,}000$. Option A wins.',
    'The "right" value of a future payment isn\'t fixed; it changes based on what else you could do with the money in the meantime.',
    'KNOWLEDGE_CHECK_DISCOUNT|Future Value: 10000, Annual Discount Rate: 8%',
    '3. <span className="text-indigo-600 font-bold">Net Present Value (NPV): Valuing a Stream</span>\nMost investments aren\'t just one payment; they are a "stream" of payments over years (like a lemonade stand, a rental property, or a giant tech company). By discounting <span className="italic">every</span> individual future payment and adding them all up, we find the <span className="text-indigo-600 font-bold">Net Present Value (NPV)</span>. This is the "Holy Grail" of valuation math.',
    '$NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t}$',
    'SIDE_QUEST_CALLOUT|side_quest_sigma|Summation (Sigma)',
    '<span className="text-indigo-600 font-bold">Worked Example — The Lemonade Stand Valuation:</span>\nYour friend\'s lemonade stand earns \\$500 in profit every year for 5 years, then closes. What is this business worth today if your required return is $10\\%$?',
    'STAND_TABLE|Year | Cash Flow | Discount Factor | Present Value\n1 | \\$500 | $\\div 1.10^1 = 0.909$ | \\$454.50\n2 | \\$500 | $\\div 1.10^2 = 0.826$ | \\$413.00\n3 | \\$500 | $\\div 1.10^3 = 0.751$ | \\$375.50\n4 | \\$500 | $\\div 1.10^4 = 0.683$ | \\$341.55\n5 | \\$500 | $\\div 1.10^5 = 0.621$ | \\$310.45\nTotal NPV | | | \\$1,895.00',
    'Even though the stand pays out \\$2,500 total, it is only "worth" \\$1,895 today. If your friend asks for \\$2,000 to buy the business, the math says: <span className="text-indigo-600 font-bold">No.</span> The price is higher than the value.',
    'KNOWLEDGE_CHECK_NPV|Annual Discount Rate: 10%',
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
      question: 'If you invest \\$1,000 today at an 8% annual interest rate, which compounding frequency yields the highest balance after 5 years?',
      options: [
        'Annual compounding (once per year)',
        'Daily compounding (365 times per year)',
        'Continuous compounding (infinitely frequent compounding)',
        'All frequencies yield the exact same final balance'
      ],
      correctIndex: 2,
      explanation: 'Continuous compounding represents the mathematical upper limit of compounding frequency: as compounding frequency approaches infinity, we use A = P * e^(rt). Because interest is converted to principal and starts earning its own interest instantly, continuous compounding always yields the highest possible final balance.',
      hint: 'Recall that compounding more frequently means earning interest on your interest sooner.'
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
