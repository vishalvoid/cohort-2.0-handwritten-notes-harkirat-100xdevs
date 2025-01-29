# **Advanced TypeScript APIs**

Before you go through this module, make sure you’ve gone through basic typescript classes. You understand `interfaces` , `types` and how typescript is used in a simple Node.js application.

# Pick

**`Pick`** allows you to create a new type by selecting a set of properties (**`Keys`**) from an existing type (**`Type`**).

Imagine you have a User model with several properties, but for a user profile display, you only need a subset of these properties.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// For a profile display, only pick `name` and `email`
type UserProfile = Pick<User, 'name' | 'email'>;

const displayUserProfile = (user: UserProfile) => {
  console.log(`Name: ${user.name}, Email: ${user.email}`);
};

```

> It let's me pick value from types as well as interfaces.&#x20;

