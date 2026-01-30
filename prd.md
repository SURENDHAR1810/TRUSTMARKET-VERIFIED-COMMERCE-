1. App Overview and Objectives 
Overview: 
This web-based marketplace prototype emphasizes trust-first shopping. Buyers browse 
everyday products, and before they can purchase, a verified worker confirms product 
authenticity through a short verification video. Users must watch and approve the video before 
proceeding, creating confidence through transparency. 
Objectives: 
 Increase buyer confidence in product authenticity 
 Demonstrate a soft-but-mandatory verification workflow 
 Explore design principles for trust-first e-commerce 
 Provide a foundation for future expansion into full e-commerce 
2. Target Audience 
Primary User: Everyday consumers (buyers) 
Context: Browsing mid-range products (electronics, fashion, home goods, accessories) online 
Pain Points: Limited trust in online sellers, hesitation due to uncertain product quality, time
constrained decision-making 
User Goal: Confirm product authenticity quickly and confidently 
3. Core Features and Functionality 
ID 
Feature 
F1 Product Listings 
Description 
Display images of products across multiple categories (electronics, 
fashion, home goods, accessories). 
F2 Verified Seller Badge Visual indicator that the seller has been pre-authenticated. 
F3 Video Verification 
F4 Soft-But-Mandatory 
Approval 
F5 Approval Action 
F6 Gate Purchase 
Verified worker records a short video of the product after the user 
selects it. 
User must watch video before proceeding; experience is friendly and 
low-friction. 
Button or checkbox to confirm product authenticity. 
Only after approval is the “Proceed to Buy” action enabled. 
Future / Optional Features: 
 Supporting multiple products in parallel 
 Historical verification videos per seller 
 Buyer feedback on videos (ratings/comments) 
 Full e-commerce flow: payments, shipping, cart, seller inventory management 
4. User Interface Design Flows (Conceptual) 
1. Browsing: 
 User sees product listings with images 
 Each product displays a “Verified Seller” badge 
2. Product Selection & Verification: 
 User selects product 
 Verified worker is prompted to record a verification video with the seller 
 Video is delivered inline to the user 
3. Approval: 
 User watches video 
 Approve button becomes active once the video is watched 
 Proceed to purchase becomes available 
UX Considerations: 
 Loading: show spinner for video 
 Success: “Product Approved” confirmation 
 Locked State: “Proceed to Buy” disabled until approval 
 Error Handling: video unavailable message, clear call-to-action 
Visual Flow (Conceptual) 
[Product Listing]  
↓ select product 
[Trigger Verified Worker] → [Video Verification] 
↓ watch video 
[Soft Approval]  
↓ approve 
[Proceed to Buy] 
Optional Expansion Paths: 
[Multiple Products] → [Parallel Verification Videos] → [Soft Approval per 
Product] 
[Historical Videos per Seller] → [Optional Buyer Feedback] 
[Full E-Commerce Integration] → [Cart, Payments, Shipping, Seller Dashboard] 
5. Security Considerations 
 Verification video must be tamper-proof (even for demo, ensure read-only playback) 
 User session should securely store approval state (even if temporary) 
 Verified worker credentials should be trusted, even in a demo 
 Privacy of sellers’ personal info must be respected 
6. Potential Challenges and Solutions 
Challenge 
Ensuring video authenticity 
Solution 
Use a controlled verification process; timestamps or 
watermark for future expansion 
User impatience 
Scaling verification 
Demonstrating trust without real 
transactions 
Collecting buyer feedback 
effectively 
Soft-but-mandatory design ensures friction is light and 
friendly 
Future: allow multiple products in parallel and verified 
worker pool 
Mock checkout and approval state; clearly indicate demo
level enforcement 
Optional ratings/comments only; no mandatory input for 
demo 
7. Future Expansion Possibilities 
 Multi-product verification flow 
 Historical verification videos to build seller trust over time 
 Buyer feedback system to rate or comment on verification videos 
 Full e-commerce integration: checkout, payments, shipping, cart management, seller 
dashboards 
 Personalized recommendations based on verified seller reliability