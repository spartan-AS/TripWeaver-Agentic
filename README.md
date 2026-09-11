# ✈️ TripWeaver — Production-Ready Multi-Agent AI Travel Planner

> **Plan smarter. Delegate to agents. Connect real-world tools. Keep humans in control.**

TripWeaver is an advanced **multi-agent AI travel planning system** built with **LangGraph, MCP, Groq Llama, Guardrails, Human-in-the-Loop, PostgreSQL, and React**.

Instead of relying on a single AI model to handle the entire travel-planning process, TripWeaver uses a **Supervisor Agent** to coordinate specialized agents and tools for different parts of the journey.

The system can work with **flight information, hotels, weather, web search, itinerary planning, and user preferences** to generate a complete travel plan.

What makes this version different is its focus on building a more **production-oriented agent architecture**, incorporating:

* 🧠 Supervisor-based multi-agent orchestration
* 🔌 Model Context Protocol (MCP)
* 🛡️ Guardrails
* 👤 Human-in-the-Loop
* 💾 Persistent PostgreSQL memory
* 🌐 Real-time external tools
* ⚛️ React frontend

---

## 🌟 Why TripWeaver?

A basic AI travel chatbot can simply generate a travel plan from an LLM.

TripWeaver goes further by creating an **orchestrated agentic workflow** where different agents have different responsibilities and the system can use external tools when required.

```text
                         👤 USER
                            │
                            ▼
                    ⚛️ React Frontend
                            │
                            ▼
                    🧠 Supervisor Agent
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        ✈️ Flight Agent  🏨 Hotel Agent  🗓️ Itinerary Agent
              │             │             │
              ▼             ▼             ▼
          MCP Tools      Search Tools   Planning Logic
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                     🌤️ Weather MCP
                            │
                            ▼
                    🤖 Final Response
                            │
                            ▼
                    🛡️ Guardrails
                            │
                            ▼
                     👤 Human Review
                            │
                            ▼
                     ✨ Final Plan
                            │
                            ▼
                    💾 PostgreSQL
```

---

# 🚀 Key Features

### 🤖 Multi-Agent Architecture

TripWeaver divides the travel-planning process into specialized agents instead of depending on a single monolithic agent.

### 🧠 Supervisor Agent

A central Supervisor Agent coordinates the workflow and decides which agent or capability should handle each part of the request.

### 🔌 Model Context Protocol (MCP)

MCP provides a standardized tool integration layer between the AI workflow and external capabilities.

Current MCP integrations include:

* ✈️ AviationStack MCP
* 🌤️ Weather MCP
* 🔎 Tavily MCP / Search capabilities

### 🛡️ Guardrails

Guardrails help validate and control the information flowing through the AI workflow before producing the final response.

### 👤 Human-in-the-Loop

The system can introduce human interaction at important stages, allowing a user to review, approve, or influence the generated travel plan.

### 💾 PostgreSQL Memory

Conversation state and workflow information can be persisted using PostgreSQL, allowing the system to maintain context across interactions.

### 🌐 Real-Time Travel Planning

TripWeaver can combine external travel information with LLM reasoning to produce more useful and context-aware travel plans.

### ⚛️ React Frontend

The application uses React for the frontend, providing a modern interactive interface for communicating with the multi-agent backend.

---

# 🧠 System Architecture

TripWeaver follows a **Supervisor + Specialized Agents + MCP Tools** architecture.

```text
                              👤 USER
                                │
                                ▼
                         ⚛️ REACT FRONTEND
                                │
                                ▼
                     ┌─────────────────────┐
                     │   🧠 SUPERVISOR     │
                     │       AGENT         │
                     └──────────┬──────────┘
                                │
             ┌──────────────────┼──────────────────┐
             │                  │                  │
             ▼                  ▼                  ▼
      ✈️ Flight Agent     🏨 Hotel Agent    🗓️ Itinerary Agent
             │                  │                  │
             ▼                  ▼                  │
       AviationStack       Tavily/Search           │
           MCP                                      │
             │                  │                  │
             └──────────────────┼──────────────────┘
                                │
                                ▼
                         🌤️ Weather MCP
                                │
                                ▼
                       🤖 Final Response
                                │
                                ▼
                         🛡️ Guardrails
                                │
                                ▼
                       👤 Human-in-the-Loop
                                │
                                ▼
                         ✨ Final Output
                                │
                                ▼
                      💾 PostgreSQL Memory
```

---

# 🧩 Supervisor Agent

The Supervisor Agent acts as the **orchestrator of the entire travel-planning workflow**.

Instead of allowing every agent to operate independently, the Supervisor determines which capability should be used and coordinates the execution of specialized agents.

Conceptually:

```text
                     User Request
                          │
                          ▼
                  🧠 Supervisor Agent
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
        Flight          Hotel        Itinerary
         Agent           Agent          Agent
            │             │             │
            └─────────────┼─────────────┘
                          ▼
                    Final Response
```

This architecture makes the workflow easier to understand, extend, and maintain.

---

# 🔌 MCP — Model Context Protocol

One of the core architectural concepts of TripWeaver is **MCP**.

Instead of tightly coupling every agent directly to individual APIs, MCP provides a standardized interface through which the AI system can access external capabilities.

### Traditional API Integration

```text
Agent
 │
 ├── Flight API Code
 ├── Weather API Code
 ├── Search API Code
 └── Other API Code
```

### MCP-Based Integration

```text
Agent
 │
 ▼
MCP Client
 │
 ├── ✈️ Flight MCP Server
 ├── 🌤️ Weather MCP Server
 └── 🔎 Search MCP Server
```

This separation makes it easier to introduce additional tools without heavily modifying the core agent workflow.

---

# ✈️ Flight Agent

The Flight Agent handles flight-related requirements.

It can access flight information through the **AviationStack MCP server**.

```text
User Requirement
      │
      ▼
Flight Agent
      │
      ▼
AviationStack MCP
      │
      ▼
Flight Information
```

---

# 🏨 Hotel Agent

The Hotel Agent focuses on finding relevant accommodation information based on the user's destination, duration, preferences, and travel requirements.

Search capabilities can be used to retrieve relevant information from external sources.

---

# 🗓️ Itinerary Agent

The Itinerary Agent transforms the collected travel information into a structured travel plan.

It can consider:

* Destination
* Trip duration
* Budget
* Flights
* Hotels
* Weather
* Activities
* User preferences

The output is then passed through the broader workflow for validation and finalization.

---

# 🌤️ Weather MCP

Weather information is exposed to the AI workflow through an MCP-based weather capability.

```text
             Weather Agent / Tool
                     │
                     ▼
                Weather MCP
                     │
                     ▼
              OpenWeatherMap
                     │
                     ▼
              Weather Data
```

This allows weather information to become another reusable tool within the agent ecosystem.

---

# 🔎 Search Integration

TripWeaver uses **Tavily** for web search capabilities.

This allows the system to retrieve external information that may be useful for travel planning, such as:

* Attractions
* Activities
* Travel recommendations
* Destination information
* Hotel information
* General travel research

---

# 🛡️ Guardrails

A production-oriented AI system should not blindly trust every generated response.

TripWeaver introduces **Guardrails** to provide an additional validation layer around the agent workflow.

Conceptually:

```text
AI Generated Output
        │
        ▼
   🛡️ Guardrails
        │
   ┌────┴────┐
   │         │
 Valid     Invalid
   │         │
   ▼         ▼
Continue   Reject /
           Re-check
```

Guardrails can help enforce expected constraints and prevent inappropriate or malformed outputs from proceeding through the workflow.

---

# 👤 Human-in-the-Loop

Trip planning can involve decisions that are better handled with human confirmation.

TripWeaver therefore supports a **Human-in-the-Loop** workflow.

Instead of completely automating every decision:

```text
AI
 │
 ▼
Generate Plan
 │
 ▼
👤 Human Review
 │
 ├── Approve
 │
 ├── Modify
 │
 └── Reject
 │
 ▼
Continue Workflow
```

This creates a balance between **automation and human control**.

---

# 💾 PostgreSQL Memory

TripWeaver uses PostgreSQL for persistent workflow and conversation memory.

```text
                User Conversation
                       │
                       ▼
                  LangGraph
                       │
                       ▼
               PostgreSQL Memory
                       │
                       ▼
                Stored Context
                       │
                       ▼
             Future Interactions
```

This allows the system to maintain relevant context instead of treating every request as completely independent.

---

# 🔄 Complete Workflow

Consider the following request:

```text
Plan a 7-day Japan trip including flights,
hotels and sightseeing under ₹2,00,000.
```

TripWeaver processes the request through a coordinated workflow:

```text
👤 USER
  │
  ▼
⚛️ React Frontend
  │
  ▼
🧠 Supervisor Agent
  │
  ├───────────────┬────────────────┐
  ▼               ▼                ▼
✈️ Flights      🏨 Hotels      🗓️ Itinerary
  │               │                │
  ▼               ▼                │
Flight MCP      Search             │
  │               │                │
  └───────────────┴────────────────┘
                  │
                  ▼
             🌤️ Weather MCP
                  │
                  ▼
           🤖 Response Agent
                  │
                  ▼
             🛡️ Guardrails
                  │
                  ▼
          👤 Human Approval
                  │
                  ▼
             ✨ Final Plan
                  │
                  ▼
            💾 PostgreSQL
```

---

# 🧠 Agentic Decision Flow

The system is designed around the idea that the LLM should not simply answer every question directly.

Instead:

```text
                   User Query
                       │
                       ▼
               🧠 Supervisor
                       │
              Is a tool required?
                 /          \
               YES           NO
                │             │
                ▼             ▼
          Select Agent     Direct Answer
                │
                ▼
             MCP Tool
                │
                ▼
          Tool Response
                │
                ▼
          Continue Workflow
                │
                ▼
          🛡️ Validation
                │
                ▼
          👤 Human Review
                │
                ▼
           Final Response
```

This tool-aware architecture helps the system use external capabilities only when they are useful.

---

# ⚛️ React Frontend

TripWeaver uses **React** for the frontend rather than Streamlit.

The frontend communicates with the backend AI workflow and provides an interactive interface for:

* 💬 Sending travel requests
* 🗓️ Viewing generated itineraries
* ✈️ Reviewing travel information
* 🏨 Exploring accommodation information
* 👤 Providing human approval or feedback
* 📋 Viewing the final travel plan

Conceptually:

```text
        ⚛️ React Frontend
               │
               ▼
          Backend API
               │
               ▼
          LangGraph
               │
               ▼
       Supervisor Agent
               │
               ▼
       Agents + MCP Tools
               │
               ▼
        Final Travel Plan
```

---

# 🛠️ Technology Stack

## 🤖 AI & Agent Framework

* **LangGraph** — Agent workflow orchestration
* **LangChain** — LLM and tool integration
* **Groq** — LLM inference
* **Llama** — Large Language Model

## 🔌 Tool Integration

* **Model Context Protocol (MCP)**
* AviationStack MCP
* Weather MCP
* Tavily MCP / Search

## 🛡️ Reliability & Control

* **Guardrails**
* **Human-in-the-Loop**

## 💾 Database

* **PostgreSQL**
* LangGraph PostgreSQL checkpointing / memory

## ⚛️ Frontend

* **React.js**
* JavaScript
* Responsive UI

---

# 🔐 Required APIs & Services

TripWeaver uses the following external services:

### Groq

Used for LLM inference.

### Tavily

Used for web search capabilities.

### AviationStack

Used for flight-related information through the AviationStack MCP integration.

### OpenWeatherMap

Used for weather information.

### PostgreSQL

Used for persistent memory and workflow state.

---

# ⚙️ Environment Variables

Create a `.env` file in the backend project:

```env
GROQ_API_KEY=your_groq_api_key

TAVILY_API_KEY=your_tavily_api_key

AVIATIONSTACK_API_KEY=your_aviationstack_api_key

DATABASE_URL=postgresql://postgres:password@localhost:5432/langgraph_memory_demo
```

For weather integration, configure the required OpenWeatherMap key according to the weather MCP implementation.

> ⚠️ **Never commit your `.env` file or API keys to GitHub.**

---

# 🗄️ PostgreSQL Setup

Install PostgreSQL and create the database:

```sql
CREATE DATABASE langgraph_memory_demo;
```

Then configure your database connection:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/langgraph_memory_demo
```

Make sure PostgreSQL is running before starting the backend.

---

# 🔌 AviationStack MCP Server Setup

TripWeaver uses the AviationStack MCP server to expose flight capabilities through MCP.

### Repository

https://github.com/Pradumnasaraf/aviationstack-mcp

---

## 1️⃣ Install UV

Check:

```bash
uv --version
```

If required:

```bash
pip install uv
```

On Windows, if necessary:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

---

## 2️⃣ Configure AviationStack

Inside the AviationStack MCP project, create a `.env` file:

```env
AVIATION_STACK_API_KEY=your_api_key_here
```

---

## 3️⃣ Install Dependencies

```bash
uv sync
```

---

## 4️⃣ Activate Environment

Windows:

```bash
.venv\Scripts\activate
```

---

## 5️⃣ Start the MCP Server

```bash
uv run -m aviationstack_mcp mcp run
```

Alternatively:

```bash
python -m aviationstack_mcp mcp run
```

Keep the MCP server running while using TripWeaver.

To stop it:

```text
CTRL + C
```

---

# 🌤️ Weather MCP Setup

Obtain an OpenWeatherMap API key and configure it according to the weather MCP implementation.

Install the required packages if they are not already installed:

```bash
pip install mcp requests
```

The weather capability can then be exposed to the LangGraph workflow through MCP.

---

# 🔎 Tavily MCP

Tavily can be integrated through its MCP server to provide web-search capabilities to the agent workflow.

This enables TripWeaver to access external information without tightly coupling the core application to a specific search implementation.

---

# 🚀 Installation

## 1️⃣ Create Python Environment

Create the Python environment:

```bash
python -m venv langgraph_env3
```

Activate it on Windows:

```bash
langgraph_env3\Scripts\activate
```

---

## 2️⃣ Install Backend Dependencies

```bash
pip install langgraph langchain langchain-openai langchain-groq langchain-community langchain-tavily psycopg[binary] psycopg_pool python-dotenv tavily-python requests mcp
```

Install PostgreSQL checkpointing support:

```bash
pip install -U "psycopg[binary,pool]" langgraph-checkpoint-postgres
```

---

# ▶️ Running the Project

Start the backend according to the project's entry point:

```bash
python main.py
```

Then start the React frontend using the project's frontend configuration.

For a typical React application:

```bash
npm install
```

Then:

```bash
npm start
```

or, if the project uses Vite:

```bash
npm run dev
```

---

# 💬 Example Prompt

Try:

```text
Plan a complete 7 days Japan trip including flights,
hotels and sightseeing under ₹2,00,000.
```

You can also provide additional constraints such as:

```text
Plan a 5-day trip to Paris for two people.
Keep the total budget under ₹1,50,000,
include flights, hotels, sightseeing and
consider the weather before suggesting activities.
```

---

# 🎯 What This Project Demonstrates

TripWeaver demonstrates practical implementation of:

* Multi-Agent AI systems
* LangGraph workflows
* Supervisor Agent architecture
* Model Context Protocol (MCP)
* MCP client/server interaction
* Tool-aware AI agents
* Human-in-the-Loop workflows
* AI Guardrails
* Persistent agent memory
* PostgreSQL checkpointing
* LLM orchestration
* Groq Llama
* External tool integration
* Web search
* Flight information retrieval
* Weather integration
* React frontend development
* Backend/frontend integration

---

# 🧠 Key Engineering Concepts

The project brings several modern AI engineering concepts together:

```text
        🧠 LLM
          │
          ▼
     🤖 AI Agents
          │
          ▼
     🧠 Supervisor
          │
          ▼
     🔌 MCP Tools
          │
          ▼
   🌐 External Services
          │
          ▼
   🛡️ Guardrails
          │
          ▼
 👤 Human-in-the-Loop
          │
          ▼
    ✨ Final Output
          │
          ▼
   💾 Persistent Memory
```

This makes TripWeaver more than a simple chatbot — it demonstrates how multiple components can be orchestrated into a **tool-enabled, stateful, human-aware AI system**.

---

# 🔮 Future Enhancements

Potential future improvements include:

### 🏨 Dedicated Hotel MCP

Introduce a dedicated hotel MCP server for structured accommodation search.

### 🚆 Transportation MCP

Add trains, buses, rental cars, and other transportation services.

### 🗺️ Maps Integration

Add maps, route planning, distance calculations, and location-based recommendations.

### 🍽️ Restaurant Agent

Introduce a dedicated restaurant-planning agent.

### 💳 Budget Agent

Create a dedicated agent responsible for calculating and monitoring:

* Flights
* Hotels
* Food
* Transportation
* Activities

while keeping the trip within the user's specified budget.

### 🧠 Long-Term Personalization

Allow the system to learn travel preferences such as:

* Preferred destinations
* Hotel preferences
* Budget preferences
* Travel style
* Preferred activities

### 📊 Observability

Add tracing and monitoring for agent decisions, tool calls, latency, and failures.

---

# 🌟 Project Highlights

| Capability             | Implementation                  |
| ---------------------- | ------------------------------- |
| 🤖 Agent Orchestration | LangGraph                       |
| 🧠 Supervisor          | Supervisor Agent                |
| 🔌 Tool Protocol       | MCP                             |
| ✈️ Flights             | AviationStack MCP               |
| 🌤️ Weather            | Weather MCP                     |
| 🔎 Web Search          | Tavily                          |
| 🛡️ Output Control     | Guardrails                      |
| 👤 Human Control       | Human-in-the-Loop               |
| 💾 Memory              | PostgreSQL                      |
| ⚡ LLM                  | Groq Llama                      |
| ⚛️ Frontend            | React                           |
| 🌐 Architecture        | Tool-enabled Multi-Agent System |

---

# 🏁 Final Takeaway

TripWeaver demonstrates how modern AI applications can move beyond simple **prompt → response** architectures.

Instead, it combines:

```text
LLMs
 +
Multi-Agent Systems
 +
LangGraph
 +
MCP
 +
Supervisor Architecture
 +
Guardrails
 +
Human-in-the-Loop
 +
Persistent Memory
 +
React
```

to create a more modular and production-oriented AI travel planning system.

The project focuses not only on **what the AI can generate**, but also on **how the AI reasons, delegates tasks, interacts with tools, validates outputs, maintains state, and keeps humans involved in important decisions**.

---

# ⭐ Support the Project

If you find TripWeaver useful or interesting, consider giving the repository a ⭐.

Feedback, suggestions, and contributions are welcome!

---

## 📜 License

This project is intended for educational, portfolio, and demonstration purposes.
