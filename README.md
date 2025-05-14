# @unqtech/age-verification-mitid

Frontend SDK for age verification using UNQVerify (MitID-powered).

🔗 Official site: [aldersverificering.dk](https://www.aldersverificering.dk)

---

## 🔧 Installation

```bash
npm install @unqtech/age-verification-mitid
```

---

## 🚀 Usage

### 1. Initialize and start the verification flow

```ts
import {
  init,
  startVerificationWithRedirect,
  startVerificationWithPopup,
  isVerified,
  getVerifiedAge,
  resetVerification,
  handleRedirectResult,
} from '@unqtech/age-verification-mitid'

init({
  publicKey: 'pk_test_abc123',
  ageToVerify: 18,
  redirectUri: 'https://yourapp.com/verify-result',
  mode: 'redirect', // or 'popup'
  onVerified: (payload) => {
    console.log('✅ Verified!', payload)
    const age = getVerifiedAge()
    console.log('Verified age:', age)
  },
  onFailure: (error) => {
    // For React: setErrorMessage(error.message)
    // For plain JS:
    console.error('❌ Verification failed', error)
  }
})

if (!isVerified()) {
  startVerificationWithRedirect()
  // or: startVerificationWithPopup()
}
```

### 2. Handle the redirect result

```ts
import { handleRedirectResult } from '@unqtech/age-verification-mitid'

handleRedirectResult({
  onVerified: (payload) => {
    console.log('✅ Token verified:', payload)
    window.close() // Optional: auto-close popup
  },
  onFailure: (err) => {
    console.error('❌ Invalid token', err)
  }
})
```

---

## 🧠 Features

- ✅ Secure JWT verification via `.well-known/jwks`
- ✅ Stores cookie-based session (24h)
- ✅ Fully frontend-safe (`pk_` public key model)
- ✅ Supports redirect and (soon) popup mode
- ✅ Easy integration in any JS or React app

---

## 🍪 Cookie Behavior

If verification is successful, a cookie named `unqverify_token` is set and used to skip future verifications (until expired).

You can clear this with:

```ts
import { resetVerification } from '@unqtech/age-verification-mitid'

resetVerification()
```

---

## 📘 API

| Function                        | Description                                         |
|----------------------------------|-----------------------------------------------------|
| `init(config)`                   | Initializes the SDK with your public key & options  |
| `startVerificationWithRedirect()`| Starts the flow in redirect mode                    |
| `startVerificationWithPopup()`   | Starts the flow in popup mode                       |
| `isVerified()`                   | Returns `true` if the user has a valid token        |
| `handleRedirectResult()`         | Used on redirect page to verify and persist token   |
| `getVerifiedAge()`               | Returns the verified age if available               |
| `resetVerification()`            | Deletes the session token cookie                    |

---

## 🔐 Token Verification

All JWTs are signed with RS256 and verified against:

```
https://test.api.aldersverificering.dk/well-known/openid-configuration/jwks
https://api.aldersverificering.dk/well-known/openid-configuration/jwks
```

---

## 📄 License

MIT © UNQTech ApS