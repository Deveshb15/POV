import React, {useState, useEffect} from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import axios from 'axios'
// import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import Head from 'next/head';
import Image from "next/image";
import Script from 'next/script'

function App() {

  const [videoURL, setVideoURL] = useState("")
  const [name, setName] = useState("")
  const [watchedVideo, setWatchedVideo] = useState(false)
  const [address, setAddress] = useState("")
  const [minted, setMinted] = useState(false)
  const [image, setImage] = useState("")
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)
  const [assets, setAssets] = useState([])
  let videolength = 0;
  let watchLength = 0;

  let dataImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnPgogICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iYmxhY2siPjwvcmVjdD4KICAgICAgPHRleHQgeD0iMTgiIHk9IjE1MCIgZm9udC1mYW1pbHk9IlBvcHBpbnMiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSI+WW91IGhhdmUgc3VjY2Vzc2Z1bGx5IHdhdGNoZWQgdGhlPC90ZXh0PgogICAgICA8dGV4dCB4PSIxOCIgeT0iMTgwIiBmb250LWZhbWlseT0iUG9wcGlucyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIj52aWRlbzo8L3RleHQ+CiAgICAgIDx0ZXh0IHg9IjE4IiB5PSIyMTAiIGZvbnQtZmFtaWx5PSJQb3BwaW5zIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiPjMwIFNlY29uZCBFeHBsYWluZXIgVmlkZW9zPC90ZXh0Pjx0ZXh0IHg9IjE4IiB5PSIzMDAiIGZvbnQtZmFtaWx5PSJQb3BwaW5zIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiPlVSTDogIGh0dHBzOi8veW91dHViZS5jb20vd2F0Y2g/dj1KelBmTWJHMXZyRTwvdGV4dD48dGV4dCB4PSIxOCIgeT0iMzMwIiBmb250LWZhbWlseT0iUG9wcGlucyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIj5NaW50ZXIgQWRkcmVzczogMHg1YjIwMmM5M2NmOWQwZDY3NjYzYjAzNGI4ZTIyOTAxMTNiYzNmY2EwPC90ZXh0Pjx0ZXh0IHg9IjE4IiB5PSIzNjAiIGZvbnQtZmFtaWx5PSJQb3BwaW5zIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiPlRpbWVzdGFtcDogNy1NYXktMjAyMiAyMjo1NDo0NzwvdGV4dD48L2c+PC9zdmc+"


  useEffect(() => {
    const fetchAssets = async () => {
      const res = await axios.get(`https://deep-index.moralis.io/api/v2/${address}/nft?chain=mumbai&format=decimal`, {
        headers: {
          'X-API-KEY': "SlV7s7iM7tIZrFOGZjYSzSKkPMXPq8LhJJebNt1Id4wnI3E5PeOpIKjG3JwOak1S"
        }
      })
      const data = res.data
      const result = data.result
      let arr = []
      for(let asset of result) {
        if(asset.token_address.toLowerCase() == '0xCD4BCb4Cd0cc71dFa4b015d79A57Fc5d817bB53b'.toLowerCase()) {
          // arr.push(asset)
          let metadata = asset.metadata
          metadata = JSON.parse(metadata)
          arr.push({
            token_address: asset.token_address,
            token_id: asset.token_id,
            metadata: metadata
          })
          // console.log(metadata)
        }
      }
      setAssets(arr)
      // console.log(arr)
    }

    if(address.length > 0) {
      fetchAssets()
    }
  }, [address, loading])

  // console.log(assets)

  const getImage = () => {
    const svgPart1 = `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
    <g>
      <rect x="0" y="0" width="500" height="500" fill="black"></rect>
      <text x="18" y="150" font-family="Poppins" font-weight="bold" font-size="24" fill="white">You have successfully watched the</text>
      <text x="18" y="180" font-family="Poppins" font-weight="bold" font-size="24" fill="white">video:</text>
      <text x="18" y="210" font-family="Poppins" font-weight="bold" font-size="24" fill="white">`
    
    const svgPart2 = `</text><text x="18" y="300" font-family="Poppins" font-weight="bold" font-size="14" fill="white">URL:  `

    const svgPart3 = `</text><text x="18" y="330" font-family="Poppins" font-weight="bold" font-size="14" fill="white">Minter Address: `

    const svgPart4 = `</text><text x="18" y="360" font-family="Poppins" font-weight="bold" font-size="14" fill="white">Timestamp: `

    const svgPart5 = `</text></g></svg>`

    // timestamp
    let today = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = today.getDate()
    const month = months[today.getMonth()]
    const year = today.getFullYear()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const timestamp = date + "-" + month + "-" + year + " " + time;

    // url
    const url = `https://youtube.com/watch?v=${videoURL}`

    const svg = svgPart1 + name + svgPart2 + url + svgPart3 + address + svgPart4 + timestamp + svgPart5
    console.log(btoa(svg))
    return btoa(svg)
  }

  async function mintNFT() {
    setLoading(true)
    if(address) {
      // const rpcURL = "https://rpc-mumbai.maticvigil.com"
      const rpcURL = process.env.NEXT_PUBLIC_RPC_URL
      console.log(process.env.NEXT_PUBLIC_RPC_URL)
      // // const rpcURL = "rinkeby"
      // const wallet = new ethers.Wallet(
      //   "a7195145c9c028ecec588a63e1f7086362a31c9d6653b97402d9f584cb541df9",
      //   ethers.getDefaultProvider(rpcURL)
      // )
      // const nft = new ThirdwebSDK(wallet).getNFTModule("0xCD4BCb4Cd0cc71dFa4b015d79A57Fc5d817bB53b")
      // const provider = ethers.Wallet.createRandom();
      const wallet = new ethers.Wallet(
        process.env.NEXT_PUBLIC_PRIVATE_KEY,
        ethers.getDefaultProvider(rpcURL)
      )
      // console.log(wallet)
      const sdk = new ThirdwebSDK(wallet);
      // const contract = sdk.getNFTModule("0x00b9d25E7B6dF5Dc35A24814f02EF8297488Cc7a");
      const contract = sdk.getNFTModule("0xCD4BCb4Cd0cc71dFa4b015d79A57Fc5d817bB53b");
      const image_base64 = getImage()
      // console.log(nft)
      const minted = await contract.mintTo(address, {
        name: name,
        description: `My Proof of viewership for ${name}`,
        image: `data:image/svg+xml;base64,${image_base64}`,
      })
      console.log(minted)
      const nftAddress = await minted.address
      console.log(nftAddress)
      const metadata = await minted.metadata
      console.log(metadata)
      // const metadata = await nft.getMetadata(minted)
      setLoading(false)
      setMinted(true)
      setImage(image_base64)
      setLink(`https://testnets.opensea.io/assets/mumbai/0xCD4BCb4Cd0cc71dFa4b015d79A57Fc5d817bB53b/${minted.id}`)
      // setLink(`https://testnets.opensea.io/assets/0x3241e8366605532bCe840975AF85aa69889d7d9F/${minted.id}`)
    } else {
      alert("Please connect your wallet")
    }
  }

  let player;

  function onPlayerReady(e) {
    let total_time = player.getDuration()
    // console.log(total_time)
    const title = player.getVideoData().title
    console.log(title)
    setName(title)
    videolength = parseInt(total_time)
    e.target.playVideo()
  }

  function onPlayerStateChange(e) {
    const current_time = player.getCurrentTime()
    // console.log(videolength, current_time, watchLength)
    if(current_time - watchLength > 10) {
      player.seekTo(watchLength, true)
      setTimeout(() => {
        onPlayerStateChange()
      }, 200)
    } else if(videolength - current_time < 2) {
      setWatchedVideo(true)
      watchLength = current_time
      console.log("video watched")
      setTimeout(stopVideo, 500)
    } else if(current_time - watchLength < 10) {
      watchLength = current_time
      setTimeout(() => {
        onPlayerStateChange()
      }, 200)
    }
  }

  function stopVideo() {
    player.stopVideo();
  }

  function onYoutubeIframeAPIReady() {
    console.log(videoURL)
    // window.YT.ready(function() {
      
    // })
    player = new YT.Player("player", {
      height: "390",
      width: "640",
      videoId: videoURL,
      playerVars: {
        playsinline: 1,
        origin: 'http://localhost:3000',
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    })
  }

  async function connectWallet() {
    try {
      const { ethereum } = window
      if(ethereum) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        console.log(accounts)
        setAddress(accounts[0])
      } else {
        alert("Please install metamask first")
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="grid justify-items-center">

        <Script src="https://www.youtube.com/iframe_api" />
      <Head>
        <title>Proof of viewership</title>
      </Head>

      <div className="flex flex-col justify-center items-center w-full">
        <input
          onChange={(e) => setVideoURL(e.target.value.substr(32))}
          placeholder="Enter a youtube video URL"
          className="m-5 focus:border-blue-400 border-3 p-2 focus:outline-none rounded-lg w-1/4 h-12 bg-gray-100"
        />

        <button
          onClick={onYoutubeIframeAPIReady}
          className="text-gray-100 text-xl p-2 rounded-lg hover:bg-white hover:text-black bg-black border shadow-md"
        >Load Video</button>
      </div>

      <div className="mt-10" id="player"></div>

      {
        watchedVideo && (
          <div className="mt-10 w-full grid justify-items-center">
            {
              !address && (
                <button
                  onClick={connectWallet}
                  className="text-gray-100 text-xl p-2 my-2 rounded-lg hover:bg-white hover:text-black bg-black border shadow-md"
                >Connect Wallet</button>
              )
            }
            {
              address && (
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={mintNFT}
                    className="text-gray-100 text-xl p-2 w-2/4 rounded-lg hover:bg-blue-900 bg-blue-500"
                  >
                    Mint NFT as Proof!
                  </button>

                  {loading && <div>Loading...</div>}

                  <div className="mt-2 py-2 grid grid-cols-2 md:grid-cols-4">
                    {assets.map((asset, i) => {
                      return (
                          <div key={i} className="text-black">
                            <Image src={asset.metadata.image} alt={`nft-${i}`} width={200} height={200} />
                            <p>{asset.metadata.name}</p>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            }
            
            {minted && (
              <div>
                <h1 className="text-2xl font-bold">Minted the NFT checkout on Opensea!</h1>
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                {/* <Image src={image} alt="nft" layout="fill" /> */}
              </div>
            )}
          </div>
        )
      }

        <div className="flex">
                    
                  </div>
    </div>
  )

}

export default App;