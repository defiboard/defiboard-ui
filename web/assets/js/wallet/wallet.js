const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
// import WalletLink from "walletlink";

// export default WalletLink;
const WalletLink = window.WalletLink;
let Web3Provider;
let Web3Instance;
const CMC_TOKEN_LIST =
  "https://api.coinmarketcap.com/data-api/v3/uniswap/all.json";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "f0fd1047ce8742fdb72ae697111b9d64",
    },
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/f0fd1047ce8742fdb72ae697111b9d64`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions, // required
});

const WalletConnector = function (
  messageBox,
  connectWalletButton,
  disconnectWalletButton
) {
  (this.messageBox = messageBox
    ? messageBox
    : document.getElementById("message")),
    (this.connectWalletButton = connectWalletButton
      ? connectWalletButton
      : document.getElementById("connect-wallet")),
    (this.disconnectWalletButton = disconnectWalletButton
      ? disconnectWalletButton
      : document.getElementById("disconnect-wallet")),
    (this.account = ""),
    (this.walletConnected = false),
    (this.init = function () {
      if (
        !(
          this.connectWalletButton &&
          this.connectWalletButton instanceof Element
        )
      ) {
        throw "connectWalletButton must be a DOM Element";
      }
      if (
        !(
          this.disconnectWalletButton &&
          this.disconnectWalletButton instanceof Element
        )
      ) {
        throw "disconnectWalletButton must be a DOM Element";
      }
      this.connectWalletButton.addEventListener("click", () => {
        this.connectWallet();
      });
      this.disconnectWalletButton.addEventListener("click", () => {
        this.disconnectWallet();
      });
    }),
    (this.checkProviderIfLoggedIn = async function () {
      if (this.walletConnected && providerLoggedInWith == "walletconnect") {
        Web3Provider = await web3Modal.connectTo("walletconnect");
      }
    }),
    (this.showMessage = function (message) {
      this.messageBox.innerText = message;
    }),
    (this.connectWallet = async function () {
      try {
        Web3Provider = await web3Modal.connect();
        this.account = await this.fetchAccountData();

        this.walletConnected = true;
        this.showMessage("Address: " + this.account);
        document.getElementById("connect-wallet").style.display = "none";
        document.getElementById("disconnect-wallet").style.display = "inline";
      } catch (e) {
        if (e.code == "4001") {
          this.showMessage(e.message);
        } else {
          this.showMessage("Couldn't get the wallet connection");
        }
        console.log("Couldn't get a wallet connection");
        console.log(e);
      }

      Web3Provider = await web3Modal.connect();
      document.getElementById("widgets").setAttribute("provider", Web3Provider);
      this.account = await this.fetchAccountData();

      // Also clear the cacheProvider so it asks for wallet options again, instead of asking the login of previous provider
      try {
        await web3Modal.clearCachedProvider();
      } catch (e) {
        console.log(e);
      }
    }),
    (this.fetchAccountData = async function () {
      // Get a Web3 instance for the wallet
      Web3Instance = new Web3(Web3Provider);

      // Get list of accounts of the connected wallet
      const accounts = await Web3Instance.eth.getAccounts();

      selectedAccount = accounts[0].toLowerCase();
      return selectedAccount;
    }),
    (this.initProviderEvents = function () {
      // Subscribe to accounts change
      Web3Provider.on("networkChanged", (accounts) => {
        console.log("networkChanged");
        console.log(accounts);
      });

      Web3Provider.on("accountsChanged", (accounts) => {
        console.log("accountsChanged");
        console.log(accounts);
      });

      // Subscribe to chainId change
      Web3Provider.on("chainChanged", (chainId) => {
        console.log("chainChanged");

        console.log(chainId);
      });

      // Subscribe to provider connection
      Web3Provider.on("connect", (info) => {
        console.log("connect");

        console.log(info);
      });

      // Subscribe to provider disconnection
      Web3Provider.on("disconnect", (error) => {
        this.showMessage("Disconnected");
        console.log("disconnect");
        console.log(error);
      });
    });
  //   console.log("----------------1--------");
  //   if (this.showMessage == "disconnect") {
  //     console.log("----------------2--------");
  //     document.getElementById("connect-wallet").style.display = "none";
  //   } else {
  //     console.log("----------------3--------");
  //     //
  document.getElementById("disconnect-wallet").style.display = "none";
  //     alert("ok");
  //   }
};

this.initProviderEvents = function () {
  // Subscribe to accounts change
  Web3Provider.on("networkChanged", (accounts) => {
    console.log("networkChanged");
    console.log(accounts);
  });

  Web3Provider.on("accountsChanged", (accounts) => {
    console.log("accountsChanged");
    console.log(accounts);
  });

  // Subscribe to chainId change
  Web3Provider.on("chainChanged", (chainId) => {
    console.log("chainChanged");

    console.log(chainId);
  });

  // Subscribe to provider connection
  Web3Provider.on("connect", (info) => {
    console.log("connect");

    console.log(info);
  });

  // Subscribe to provider disconnection
  Web3Provider.on("disconnect", (error) => {
    this.showMessage("Disconnected");
    console.log("disconnect");
    console.log(error);
  });

  console.log("----------------1--------");
  // if(this.account == ''){
  //     console.log('----------------2--------')

  //     document.getElementById('disconnect-wallet').style.display ='none';
  // }else{
  //     console.log('----------------3--------')
  //     document.getElementById('connect-wallet').style.display ='none';
  // }

  if (Web3Provider != undefined) {
  }
};

let walletConnector = new WalletConnector();
walletConnector.init();
