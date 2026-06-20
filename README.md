# Account Login

Đăng nhập chỉ sử dụng **Phone**, **Email** và **City**.

## Sample Accounts

| Phone           | Email                                         | City        |
| --------------- | --------------------------------------------- | ----------- |
| 0123456789      | [admin@gmail.com](mailto:admin@gmail.com)     | Hồ Chí Minh |
| 0987654321      | [admin@sunny.com](mailto:admin@sunny.com)     | Hồ Chí Minh |
| 0901234567      | [vancafe@gmail.com](mailto:vancafe@gmail.com) | Hà Nội      |

---

## JSON Data

```json
[
  {
    "phone": "0123456789",
    "email": "admin@gmail.com",
    "city": "Hồ Chí Minh"
  },
  {
    "phone": "0987654321",
    "email": "admin@sunny.com",
    "city": "Hồ Chí Minh"
  },
  {
    "phone": "0901234567",
    "email": "vancafe@gmail.com",
    "city": "Hà Nội"
  }
]
```

---

## Login Rule

* V Use **Phone** to display user information.
* V Use **Email** as unique identifier.
* V Use **City** for filtering/searching.
* X Do **not** use `name`. And `message`.
