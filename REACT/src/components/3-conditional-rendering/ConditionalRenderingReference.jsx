/*
================================================================================================================
                  REACT JSX CONDITIONAL RENDERING — QUICK REFERENCE
================================================================================================================

| # | METHOD                    | SYNTAX                                      | WHAT IT DOES                         |
|---|---------------------------|---------------------------------------------|--------------------------------------|
| 1 | Multiple Returns          | if (condition) return <JSX />;              | Stops the entire component           |
| 2 | Short Circuit             | {condition && <JSX />}                      | Shows JSX only if condition is true  |
| 3 | Ternary Operator          | {condition ? A : B}                         | Chooses between TWO JSX outputs      |
| 4 | Return null               | return null;                                | Renders nothing                      |
| 5 | Normal if                 | if (condition) { ... }                      | Performs logic before JSX return     |
| 6 | Conditional Value         | let value; if (...) value = ...;            | Calculates what JSX should display   |
|   |                           | return <div>{value}</div>;                  |                                      |


================================================================================================================
1. MULTIPLE RETURNS
================================================================================================================

| PURPOSE       | Show completely different UI depending on a condition.                  |
|---------------|--------------------------------------------------------------------------|
| SYNTAX        | if (condition) { return <JSX />; }                                       |
|               | return <JSX />;                                                         |
| BEST FOR      | Loading, Error, Empty, Success states                                   |
| MAIN IDEA     | "Should I STOP the entire component?"                                   |
| IMPORTANT     | A return immediately exits the component.                               |
|               | Only ONE return executes during a render.                               |
|               | You do NOT need "else" after a return.                                  |


EXAMPLE:----------------------------------------------------------------------------------------------------------------

if (isLoading) {
  return <h3>Loading...</h3>;
}

if (isError) {
  return <h3>Error...</h3>;
}

return <h1>Data loaded successfully!</h1>;


FLOW:----------------------------------------------------------------------------------------------------------------

                         START
                           |
                           v
                    Is isLoading true?
                      /          \
                    YES           NO
                     |             |
                     v             v
                 Loading      Is isError true?
                                /        \
                              YES         NO
                               |           |
                               v           v
                             Error       Success


================================================================================================================
2. SHORT-CIRCUIT RENDERING (&&)
================================================================================================================

| PURPOSE       | Show something ONLY when a condition is true.                       |
|---------------|---------------------------------------------------------------------|
| SYNTAX        | {condition && <JSX />}                                              |
| BEST FOR      | Optional elements                                                   |
| MAIN IDEA     | "Should I show THIS particular thing?"                              |
| IMPORTANT     | Does NOT stop the entire component.                                 |
|               | Uses JavaScript's logical AND (&&) operator.                        |


EXAMPLE:----------------------------------------------------------------------------------------------------------------

{isLoading && <h3>Loading...</h3>}


isLoading = true
        ↓
true && <h3>Loading...</h3>
        ↓
<h3>Loading...</h3> is rendered


isLoading = false
        ↓
false && <h3>Loading...</h3>
        ↓
Nothing is rendered


ANOTHER EXAMPLE:----------------------------------------------------------------------------------------------------------------

{isAdmin && <button>Delete User</button>}


================================================================================================================
3. TERNARY OPERATOR (? :)
================================================================================================================

| PURPOSE       | Choose between TWO possible JSX outputs.                         |
|---------------|-------------------------------------------------------------------|
| SYNTAX        | {condition ? JSX_IF_TRUE : JSX_IF_FALSE}                         |
| BEST FOR      | Two possible outcomes                                             |
| MAIN IDEA     | "Which of these TWO things should I show?"                       |
| IMPORTANT     | Has BOTH a true and false result.                                |
|               | Avoid deeply nested ternaries because they become hard to read.  |


EXAMPLE:
----------------------------------------------------------------------------------------------------------------

{isLoggedIn ? <h1>Welcome</h1> : <h1>Please Login</h1>}


isLoggedIn = true
        ↓
<h1>Welcome</h1>


isLoggedIn = false
        ↓
<h1>Please Login</h1>


ANOTHER EXAMPLE:
----------------------------------------------------------------------------------------------------------------

<button>
  {isLoggedIn ? "Logout" : "Login"}
</button>


================================================================================================================
4. NORMAL if STATEMENT
================================================================================================================

| RULE          | A normal if statement cannot be written directly inside JSX.       |
|---------------|-------------------------------------------------------------------|
| WRONG         | <div> if (isLoading) { ... } </div>                              |
| CORRECT       | Use &&, ternary, multiple returns, or logic before return.       |


❌ WRONG:----------------------------------------------------------------------------------------------------------------

return (
  <div>
    if (isLoading) {
      <p>Loading...</p>
    }
  </div>
);


✅ CORRECT:----------------------------------------------------------------------------------------------------------------

return (
  <div>
    {isLoading && <p>Loading...</p>}
  </div>
);

OR:----------------------------------------------------------------------------------------------------------------

if (isLoading) {
  return <p>Loading...</p>;
}


================================================================================================================
5. CONDITIONAL VALUE BEFORE RETURN
================================================================================================================

| PURPOSE       | Use normal JavaScript logic before returning JSX.                  |
|---------------|-------------------------------------------------------------------|
| BEST FOR      | More complex conditional logic                                    |
| MAIN IDEA     | Calculate the value first, then put that value inside JSX.        |


EXAMPLE:----------------------------------------------------------------------------------------------------------------

let message;

if (isLoggedIn) {
  message = "Welcome!";
} else {
  message = "Please log in.";
}

return <h1>{message}</h1>;


ANOTHER EXAMPLE:----------------------------------------------------------------------------------------------------------------

let content;

if (isLoading) {
  content = <p>Loading...</p>;
} else if (isError) {
  content = <p>Error...</p>;
} else {
  content = <p>Success!</p>;
}

return <div>{content}</div>;


================================================================================================================
6. NULL RENDERING
================================================================================================================

| PURPOSE       | Render absolutely nothing.                                      |
|---------------|------------------------------------------------------------------|
| SYNTAX        | return null;                                                     |
| MAIN IDEA     | "There is nothing to render."                                    |
| IMPORTANT     | React renders nothing when a component returns null.             |


EXAMPLE:----------------------------------------------------------------------------------------------------------------

if (!user) {
  return null;
}


TERNARY EXAMPLE:
----------------------------------------------------------------------------------------------------------------

{isLoggedIn ? <Dashboard /> : null}


MEANING:----------------------------------------------------------------------------------------------------------------

null
 ↓
React renders NOTHING.


================================================================================================================
7. LOADING / ERROR / EMPTY / SUCCESS PATTERN
================================================================================================================

A VERY COMMON React pattern when fetching API data:

----------------------------------------------------------------------------------------------------------------

if (isLoading) {
  return <p>Loading...</p>;
}

if (isError) {
  return <p>Something went wrong.</p>;
}

if (!data) {
  return <p>No data available.</p>;
}

return <User data={data} />;


FLOW:
----------------------------------------------------------------------------------------------------------------

                              START
                                |
                                v
                         Is it loading?
                           /         \
                         YES          NO
                          |            |
                          v            v
                       LOADING    Is there an error?
                                   /           \
                                 YES            NO
                                  |              |
                                  v              v
                               ERROR       Is there data?
                                             /       \
                                           NO         YES
                                            |           |
                                            v           v
                                          EMPTY       SUCCESS


================================================================================================================
8. JSX EXPRESSIONS { }
================================================================================================================

JavaScript EXPRESSIONS can be placed inside JSX using:

{ }


EXAMPLES:----------------------------------------------------------------------------------------------------------------

{user.name}

{2 + 2}

{isLoading && <p>Loading...</p>}

{isLoggedIn ? <Dashboard /> : <Login />}


IMPORTANT:----------------------------------------------------------------------------------------------------------------

JSX allows EXPRESSIONS inside { }.

A normal JavaScript STATEMENT such as if/else cannot
normally be placed directly inside JSX.


❌ WRONG:----------------------------------------------------------------------------------------------------------------

<div>
  if (isLoggedIn) {
    ...
  }
</div>


✅ CORRECT:----------------------------------------------------------------------------------------------------------------

<div>
  {isLoggedIn && <Dashboard />}
</div>


================================================================================================================
9. WHEN SHOULD I USE WHICH?
================================================================================================================

| SITUATION                    | USE                    | EXAMPLE                         |
|------------------------------|------------------------|---------------------------------|
| Loading / Error / Success    | Multiple Returns       | if (...) return <Loading />     |
| Optional element             | Short Circuit (&&)     | {isAdmin && <AdminPanel />}    |
| Two possible outcomes        | Ternary (? :)          | {login ? <Home /> : <Login />}  |
| Show nothing                 | return null            | if (!user) return null;         |
| Complex logic                | Normal if before JSX   | if (...) content = ...          |
| Calculate JSX/value first    | Conditional variable  | let content = ...               |


================================================================================================================
10. MULTIPLE RETURNS vs SHORT CIRCUIT vs TERNARY
================================================================================================================

| FEATURE             | MULTIPLE RETURNS       | SHORT CIRCUIT          | TERNARY                |
|---------------------|------------------------|------------------------|------------------------|
| Syntax              | if (...) return ...    | condition && JSX       | condition ? A : B      |
| Stops component?    | ✅ YES                | ❌ NO                  | ❌ NO                 |
| Controls whole UI?  | ✅ YES                | ❌ NO                  | ❌ NO                 |
| Controls part?      | ❌ Usually no         | ✅ YES                 | ✅ YES                |
| Has false output?   | Not necessarily        | ❌ NO                  | ✅ YES                |
| Best for            | Loading/error states   | Optional elements      | Two choices            |
| Readability         | ⭐⭐⭐⭐⭐          | ⭐⭐⭐⭐⭐           | ⭐⭐⭐⭐             |


================================================================================================================
11. EASY MEMORY RULE
================================================================================================================

MULTIPLE RETURNS
→ "Should I STOP the whole component?"

SHORT CIRCUIT &&
→ "Should I SHOW this particular thing?"

TERNARY ? :
→ "Which of these TWO things should I show?"

RETURN NULL
→ "Should I SHOW NOTHING?"

NORMAL IF
→ "I need JavaScript LOGIC before I return JSX."


================================================================================================================
12. QUICK CHEAT SHEET
================================================================================================================

| WHAT I WANT TO DO                  | CODE                                |
|------------------------------------|-------------------------------------|
| Stop component while loading       | if (loading) return <Loading />;   |
| Stop component on error            | if (error) return <Error />;       |
| Show optional element              | {condition && <Element />}         |
| Choose between two elements        | {condition ? <A /> : <B />}        |
| Choose between two text values     | {condition ? "Yes" : "No"}         |
| Render nothing                     | return null;                        |
| Complex logic                      | let content; if (...) ...           |
| Put JS expression in JSX           | {expression}                        |


================================================================================================================
                        GOLDEN RULE
================================================================================================================

MULTIPLE RETURNS
        ↓
Different COMPLETE UI states

SHORT CIRCUIT &&
        ↓
OPTIONAL UI

TERNARY ? :
        ↓
TWO POSSIBLE UI OPTIONS

return null
        ↓
NOTHING

NORMAL if
        ↓
JAVASCRIPT LOGIC BEFORE JSX


================================================================================================================
*/

/*
===========================================================
        THE MAIN DIFFERENCE
===========================================================

MULTIPLE RETURNS
-----------------------------------------------------------
Uses:
    if + return

Example:

if (isLoading) {
  return <h3>Loading...</h3>;
}

if (isError) {
  return <h3>Error...</h3>;
}

return <h1>Success!</h1>;


Meaning:
→ "If this condition is true, STOP the component
   and return this JSX."

Key idea:
    if + return
    ↓
    Stops the entire component


===========================================================

SHORT-CIRCUIT RENDERING
-----------------------------------------------------------
Uses:
    &&

Example:

return (
  <>
    <h1>User Profile</h1>

    {isLoading && <h3>Loading...</h3>}

    {isError && <h3>Error...</h3>}
  </>
);


Meaning:
→ "If this condition is true, render this JSX."

Key idea:
    condition && JSX
    ↓
    Controls only that part of the JSX
    ↓
    Does NOT stop the entire component


===========================================================

EASY WAY TO REMEMBER
===========================================================

MULTIPLE RETURNS
    if + return
        ↓
    STOP the component


SHORT CIRCUIT
    &&
        ↓
    SHOW/HIDE part of the JSX


===========================================================
*/
