```
async function fetchPools(chainId, dexName) {
return request(
    "GET",
    "https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/pools/?quote-currency=USD&format=JSON&key=${API_KEY}"
  );
} 	
```


click below to see the code
https://github.com/defiboard/defiboard-ui/blob/e01bcba399cfef34a6f8d9488539e53b35b136cb/web/assets/js/functions/pools.js

[![Covalent Video](https://user-images.githubusercontent.com/102347045/169799533-5343c22d-a0a1-4289-99b1-99eb17f3184d.png)](https://vimeo.com/712816681 "- Click to Watch!")
