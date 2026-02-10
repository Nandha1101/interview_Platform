import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton,UserButton } from '@clerk/clerk-react';
function App() {

  return (
    <>
      <h1>Welcome to the App</h1>
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="">
            Login
          </button>
          </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}

export default App
