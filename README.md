# 🔐 Account Login

Đăng nhập chỉ sử dụng **Name**, **Email** và **City**.

## Sample Accounts

| Name            | Email                                         | City        |
| --------------- | --------------------------------------------- | ----------- |
| admin           | [admin@gmail.com](mailto:admin@gmail.com)     | Hồ Chí Minh |
| Admin Sunny     | [admin@sunny.com](mailto:admin@sunny.com)     | Hồ Chí Minh |
| Nguyễn Văn Cafe | [vancafe@gmail.com](mailto:vancafe@gmail.com) | Hà Nội      |

---

## JSON Data

```json
[
  {
    "name": "admin",
    "email": "admin@gmail.com",
    "city": "Hồ Chí Minh"
  },
  {
    "name": "Admin Sunny",
    "email": "admin@sunny.com",
    "city": "Hồ Chí Minh"
  },
  {
    "name": "Nguyễn Văn Cafe",
    "email": "vancafe@gmail.com",
    "city": "Hà Nội"
  }
]
```

---

## Login Rule

* ✅ Use **Name** to display user information.
* ✅ Use **Email** as unique identifier.
* ✅ Use **City** for filtering/searching.
* ❌ Do **not** use `phone`.
* ❌ Do **not** use `message`.
