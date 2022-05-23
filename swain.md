## Swing :

![swing demo](https://user-images.githubusercontent.com/102347045/169872942-5be7c90f-4e29-42fb-91cf-c1a41d69ccbb.png)



```
 async function fetchSwingData(params) {
  return request(
    "GET",
    `https://swap.dev.swing.xyz/v0/transfer/quote?${formatParams(params)}`
  );
}
```

[click here to see the code](https://github.com/defiboard/defiboard-ui/blob/aa8e738e2fe2d0e85914b6f32aedaba3f507f18d/web/assets/js/wallet/swing.js)
