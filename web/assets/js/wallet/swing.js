function formatParams(params) {
  Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
}
async function getQuotes(params) {
  const data = fetchSwingData(params);
  const itemsData = data.routes;
  for (let i = 0; i < itemsData.length; i++) {
    let item = itemsData[i];
    try {
      let x = `<tr>  
      <td> <img src="${item.token_0.logo_url}" style="width:50px" alt="" />  </td>
            
            <td> ${item[i].duration} </td>
            <td> ${item[i].amount} </td>
            <td> ${item[i].bridgeFee} </td>
            <td> ${item[i].bridge} </td>
        
            
            </tr>`;

      body = body + x;
    } catch (error) {
      console.log(error);
    }
  }
  divPagePools.classList.remove("hidden");
  poolsBody.innerHTML = body;
}

async function fetchSwingData(params) {
  return request(
    "GET",
    `https://swap.dev.swing.xyz/v0/transfer/quote?${formatParams(params)}`
  );
}

buttonGetQuote.addEventListener("click", async () => {
  alert("get quote clicked");
});
