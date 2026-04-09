#Tmoodbile Notes

embed youtube video and devpost links at the ending: https://youtu.be/NIEeKt1iJII?si=eCPchuoJOj5tbjEb
https://devpost.com/software/t-mood-bile

Inspiration
We were inspired by the challenge of understanding, compiling, and acting on customer sentiment at scale. Data is a tricky thing, and making it easy to visualize and use can be even trickier. We wanted to build a proactive system that could not only listen but ask, to help T-Mobile both know how their customers feel, but also know how to improve.

What it does
T-Moodbile is a complete, 360-degree sentiment analysis platform that:
Conducts AI-Powered Voice Surveys: An AI agent places automated, realistic-sounding voice calls to customers (using Twilio and ElevenLabs) to ask for their feedback.
Performs Multi-Channel Analysis: It scrapes Reddit (r/Tmobile) and Google Trends (via SerpApi) to build a complete picture of both "direct" (customer-provided) and "indirect" (public search) sentiment.
Generates AI Sentiment & Insights: All customer feedback (from calls and Reddit) is fed into the Google Gemini API for advanced sentiment analysis ("good", "neutral", "bad"). For "bad" or "neutral" feedback, Gemini generates an actionable insight for T-Mobile to fix the specific problem.
Sends Proactive Email Alerts: A node-cron job runs every 5 minutes to check the overall sentiment. If the "good" sentiment drops below our 70% threshold, it automatically sends an email alert (using the Resend API) to a list of T-Mobile employees.
Manages Feedback: The system has a "to-do list" of unresolved insights. When an employee takes action to fix a customer's problem, they can click "Mark as Resolved," which updates the database via our API and removes the item from the queue.
How we built it
Frontend: Next.js hosted on Vercel with our custom GoDaddy domain

Backend: A Node.js/Express server acts as the central hub, handling all API routes and webhook logic.

Database: We used a Neon serverless Postgres database to store all customer data, survey responses, and social media posts.

The AI Call Flow:
An API call (from our Swagger UI) triggers the callCustomer function.
Twilio makes the call and pings our ngrok tunnel for TwiML (XML) instructions.
Our server generates that TwiML, which includes an tag pointing to an audio file generated in real-time by the ElevenLabs realistic voice API.
Twilio plays the audio, then records the customer's response.
When the call hangs up, Twilio sends a webhook with the recording URL.
The AI Analysis Flow:
Our server receives the recording webhook.
It authenticates with Twilio to download the .wav file.
The audio buffer is sent to the Google Cloud Speech-to-Text API for transcription.
The transcript is sent to the Google Gemini API for sentiment analysis ("good", "neutral", "bad").
If the sentiment is "bad" or "neutral," the transcript is sent back to Gemini with a special prompt to generate an "actionable insight."
The transcript, sentiment, and insight are all saved to our Neon database.
The Data Scraping Flow:
A node-cron job runs hourly to scrape Reddit using axios. It analyzes each post with the same Gemini analysis flow (sentiment + insight) and saves it to the DB.
A separate node-cron job runs daily, calling the SerpApi for Google Trends data to compare negative-intent keywords (like "How to cancel T-Mobile") against positive ones (like "T-Mobile deals") and saves the time-series data.
The Alerting Flow:
A third node-cron job runs every 5 minutes, queries the database for the overall sentiment percentage.
If the score is below 70%, it fires an alert to all employees in our users table using the Resend API. It uses a stateful flag (isAlertActive) to prevent spamming users with repeat emails.
MLH Tools we used (not sure where else to specify this)
Gemini and Google Cloud (for sentiment analysis and getting transcript from customer)
ElevenLabs (for making the voice on the phone)
GoDaddy (for getting our tmoodbile.biz domain)
Challenges we ran into
It would be faster to list any challenges we didn't run into. But really, the main constraints that made development tough were the time (obviously), working within the free tier of a lot of services, and integrating a pretty robust backend with our frontend.

Accomplishments that we're proud of
We're most proud of the extra features we thought of to enhance our project. T-Moodbile is more than just a visualization tool, our AI-Agent that conducts calls for you in the background to get feedback from T-Mobile customers, our email notification service to alert employees of low sentiment values, and our actionable insights make T-Moodbile a much more versatile application.

What we learned
We learned a lot about how to effectively integrate AI into an application. AI has many use cases, but most of the time it can feel like something added onto a project just for the sake of saying it has AI. We spent a lot of time designing and really thinking about what we wanted our product to be and where we could use AI in it, and we're happy with the way it turned out.

What's next for T-Moodbile
Many things. With proper access to T-Mobile data, we can conduct a random sample survey at the click of a button, instead of only being able to call one person. In the future, exporting the data to a clean, easily-readable PDF report will be available at the click of a button. Other than that, general quality of life and customization features that allow the user to more easily manage data from within the dashboard will come next.

Built With
elevenlabs
gemini
godaddy
google-cloud
neon
next.js
node.js
postgresql
twilio
Try it out
 GitHub Repo