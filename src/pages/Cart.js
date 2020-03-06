import React, { useState, useEffect } from 'react'

function Cart() {
  const [mycart, setMycart] = useState([])
  const [mycartDisplay, setMycartDisplay] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  async function getCartFromLocalStorage() {
    // 開啟載入指示
    setDataLoading(true)

    const newCart = localStorage.getItem('cart') || []
    localStorage.setItem('cart', newCart)

    console.log(JSON.parse(newCart))

    // 設定資料
    setMycart(JSON.parse(newCart))
  }

  // 一開始就會開始載入資料
  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 每次mycart資料有變動就會3秒後關掉載入指示
  useEffect(() => {
    setTimeout(() => {
      setDataLoading(false)
    }, 500)
    console.log('mycart', mycart)
    let NewMycartDisplay = []
    // console.log('mycartDisplay', mycartDisplay)

    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      const index = NewMycartDisplay.findIndex(val => {
        console.log('val', val)
        return val.id === mycart[i].id
      })
      console.log(index)
      //有的話就數量+1
      //沒有的話就把項目加入，數量為1
      if (index !== -1) {
        NewMycartDisplay[index].amount += mycart[i].amount
      } else {
        // console.log('mycart[i]', mycart[i])
        const newItem = { ...mycart[i] }
        // console.log('newItem', newItem)
        NewMycartDisplay = [...NewMycartDisplay, newItem]
      }
    }
    console.log('NewMycartDisplay', NewMycartDisplay)
    setMycartDisplay(NewMycartDisplay)
  }, [mycart])

  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  const display = (
    <>
      <ul className="list-group">
        {mycartDisplay.map((val, ind) => {
          return (
            <li className="list-group-item" key={ind}>
              名稱:{val.name} / 數量:{val.amount} / 單價:{val.price} / 小計:
              {val.amount * val.price}
            </li>
          )
        })}
      </ul>
      <h3>總價：</h3>
    </>
  )

  return (
    <>
      <div className="container">{dataLoading ? loading : display}</div>
    </>
  )
}

export default Cart
