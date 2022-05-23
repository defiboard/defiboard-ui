const API_KEY = "ckey_c831b5202f8e44219b9210c58ee";

async function fetchPools(chainId, dexName) {
  return request(
    "GET",
    `https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/pools/?quote-currency=USD&format=JSON&key=${API_KEY}`
  );
}

async function populatePools(chainId, dexName) {
  if (getActivePage().id === "pools-page") {
    try {
      console.log("-----------------------cryptoAPI");

      var poolsData = await fetchPools(chainId, dexName);
      var items = [];
      console.log("-----------------------poolsData", poolsData);
      // await cryptoAPI.getPools(1, 'uniswap_v2');
      if (divPagePools.getElementsByClassName("loading-icon").length > 0) {
        // divPagePools.innerHTML = "";
      }

      if (poolsData && !poolsData["error"]) {
        poolsData = await poolsData["data"];
        items = await poolsData["items"];
        console.log("-----------------------poolsData", items);

        await generatePoolsRow(items);
      } else {
      }
    } catch (error) {
      console.log(error);
      errorNotification("Something went wrong... - EW22");
    }
  }
}

async function generatePoolsRow(itemsData) {
  let body;

  for (let i = 0; i < itemsData.length; i++) {
    let item = itemsData[i];
    try {
      let x = `<tr>  
      <td> <img src="${
        item.token_0.logo_url
      }" style="width:50px" alt="" />  </td>
            <td>${
              item.token_0.contract_name + "-" + item.token_1.contract_name
            }  </td>
            <td> ${item.total_liquidity_quote} </td>
            <td> ${item.volume_24h_quote
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </td>
            <td> ${item.volume_7d_quote
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </td>
            <td> ${item.swap_count_24h} </td>
            <td> ${item.fee_24h_quote
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </td>
            <td> ${item.annualized_fee * 100} </td> </tr>`;

      body = body + x;
    } catch (error) {
      console.log(error);
    }
  }
  divPagePools.classList.remove("hidden");
  poolsBody.innerHTML = body;
}
