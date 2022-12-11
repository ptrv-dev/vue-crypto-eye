const API_KEY = 'Y81VV2763HW96WBIHU8TYW26HWI8G3KC4B';

export async function getTransactions(walletAddress) {
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${API_KEY}`
  ).then((res) => res.json());
  if (Number(response.status) !== 1) {
    throw new Error(response.result);
  }
  return response.result;
}

export async function getBalance(walletAddress) {
  const response = await fetch(
    `https://api.etherscan.io/api?module=account&action=balance&address=${walletAddress}&tag=latest&apikey=${API_KEY}`
  ).then((res) => res.json());
  if (Number(response.status) !== 1) {
    throw new Error(response.result);
  }
  return response.result;
}
