import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    var results, web3 = window.web3
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3: web3
      }

      console.log('Injected web3 detected.');

      resolve(results)
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      var provider = null;

      // NOTE from jess-- i don't know enough yet about the following options
      // if (process.env.GANACHE_APP) {
      //   provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545/m/44'/60'/0'/0/1")
      //
      // } else if (process.env.GANACHE_CLI) {
      //   provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545/m/44'/60'/0'/0/1")
      //
      // } else {
      // Truffle (with Ganache.app running)
      // }
        provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
        web3 = new Web3(provider)


      results = {
        web3: web3
      }

      console.log(`No web3 instance injected, using ${provider.host}'s web3.`);

      resolve(results)
    }
  })
})
export default getWeb3
