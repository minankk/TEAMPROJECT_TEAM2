<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up Page</title>
    <link rel="stylesheet" href="SignUp.css">
</head>
<body>
    
    <!--  Header HTML-->
    
    <header>
        <div class="header-left">
    <div class="logo">Logo</div>
    <nav class="navbar">
        <ul>
        <li><a>Homepage</a></li>
        <li><a>New in Stores</a></li>
        <li><a>Best Sellers</a></li>
        <li><a>Sale</a></li>
        <li><a>Browse</a></li>   
    </ul>
</nav>
</div>
<div class="Search-bar">
    <input type="text" placeholder="Search here"/>
    <button>🔍</button>
  <button>🛒</button>
  <button>👤</button>
</div>
</header>

<!--  Sign up Container-->
<main>
    
    <div class="Signup-container">
        <h1>Create an account</h1>
        <form action="/login" method="POST">
    
 <!--  Username Input field-->
   <div class="inputfield">
    <label for="User-name">User name</label>
    <input type="text" id="user name" placeholder="user name" required>
   </div>   

  <!-- Email -->

  <div class="inputfield">
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="email" required>
   </div>      


    <!--  Password Input field-->

    <div class="inputfield">
        <label for="Password">Password:</label>
        <input type="password" id="password" placeholder="password" required>
       </div>
             
    <!-- Confirm password-->
    <div class="inputfield">
        <label for="Password">Confirm password</label>
        <input type="password" id="Confirm-password" placeholder="confirm password" required>
       </div>
      
       <!-- Sign Up Button-->
        <div>
 <button type="submit"> Sign up</button>
 <button type="button" class="admin-signup">Admin Sign up</button>
       </div>
        </form>
    
</main>


<!--  Footer HTML-->

<footer>
    <div class="Footer-links">
        
        <div>
           <h4>Company</h4>
            <p><a>About Us</a></p>  
            <p><a>Stakeholders</a></p>
        </div>

        <div>
    <h4>Customer Service</h4>
    <p><a>Contact Us</a></p>
        <p><a>My Account</a></p>
</div>
</div> 
<div class  ="social-icons">
<button>🐦</button>
<button>📸</button>
<button>📧</button>

</div>
</body>
</footer>

</html>
