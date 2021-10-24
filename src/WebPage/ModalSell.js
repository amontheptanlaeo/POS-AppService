import React , { useState , useEffect  } from 'react'
import {
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Input,InputGroup,InputGroupText,InputGroupAddon
} from "reactstrap";
import { Link } from 'react-router-dom'
import '../styles/ModalSell.scss'
import axios from 'axios';

var ChangeText = {
  B1000: '',
  B500: '',
  B100: '',
  B50: '',
  B20: '',
  C10: '',
  C5: '',
  C2: '',
  C1: '',
  C50: '',
  C25: '',
}


function ModalSell({show , onHide , toggle , GoodsPrice}) {

    

    const [BankDaily, setBankDaily] = useState(0);
    const [MoneyTotal, setMoneyTotal] = useState(0);

    const [Money, setMoney] = useState(0);
    const [Change, setChange] = useState(0);

    //รอลิ้ง DB 
    const [B1000, setB1000] = useState(0);
    const [B500, setB500] = useState(0);
    const [B100, setB100] = useState(0);
    const [B50, setB50] = useState(0);
    const [B20, setB20] = useState(0);
    const [C10, setC10] = useState(0);
    const [C5, setC5] = useState(0);
    const [C2, setC2] = useState(0);
    const [C1, setC1] = useState(0);  
    const [C50, setC50] = useState(0);
    const [C25, setC25] = useState(0);

    
    const [B1000Add, setB1000Add] = useState(0);
    const [B500Add, setB500Add] = useState(0);
    const [B100Add, setB100Add] = useState(0);
    const [B50Add, setB50Add] = useState(0);
    const [B20Add, setB20Add] = useState(0);
    const [C10Add, setC10Add] = useState(0);
    const [C5Add, setC5Add] = useState(0);
    const [C2Add, setC2Add] = useState(0);
    const [C1Add, setC1Add] = useState(0);
    const [C50Add, setC50Add] = useState(0);
    const [C25Add, setC25Add] = useState(0);


    const [modalAlert, setModalAlert] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);


  const GetBankDaily = async() => {
    const Resp = await axios.post('https://posappserver.herokuapp.com/checkbankdaily',{
      Branch_ID: localStorage.getItem('Branch_ID'),
      Store_ID: localStorage.getItem('Store_ID')
    })
    if(Resp.data != ''){
      console.log('Sell',Resp)
      setBankDaily(Resp.data)
      setMoneyTotal(Resp.data[0].MoneyTotal)
      setB1000(Resp.data[0].B1000)
      setB500(Resp.data[0].B500)
      setB100(Resp.data[0].B100)
      setB50(Resp.data[0].B50)
      setB20(Resp.data[0].B20)
      setC10(Resp.data[0].C10)
      setC5(Resp.data[0].C5)
      setC2(Resp.data[0].C2)
      setC1(Resp.data[0].C1)
      setC50(Resp.data[0].C50)
      setC25(Resp.data[0].C25)
    }else{
      setModalAlert(!modalAlert)
    }
    
    
   
  }

  const SellAPI = async(value2,C2Param,B50Param,B20Param,B1000Param,B500Param,B100Param,C10Param,C5Param,C1Param,C50Param,C25Param) => {

    if(!C2Param) C2Param=0
    if(!B50Param) B50Param=0
    if(!B20Param) B20Param=0
    if(!B1000Param) B1000Param=0
    if(!B500Param) B500Param=0
    if(!B100Param) B100Param=0
    if(!C10Param) C10Param=0
    if(!C5Param) C5Param=0
    if(!C1Param) C1Param=0
    if(!C50Param) C50Param=0
    if(!C25Param) C25Param=0

    const currentdate = new Date();
    const dateOnAdd = currentdate.getFullYear() +
        "-" +
        (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1) +
        "-" +
        (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate()) +
        "T" +
        (currentdate.getHours() < 10
        ? "0" + currentdate.getHours()
        : currentdate.getHours()) +
        ":" +
        (currentdate.getMinutes() < 10
        ? "0" + currentdate.getMinutes()
        : currentdate.getMinutes()) +
        ":" +
        (currentdate.getSeconds() < 10
        ? "0" + currentdate.getSeconds()
        : currentdate.getSeconds())


      const genDate = currentdate.getFullYear() +
      
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1).toString() +
     
      (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate()).toString() +
     
      (currentdate.getHours() < 10
        ? "0" + currentdate.getHours()
        : currentdate.getHours()).toString() +
     
      (currentdate.getMinutes() < 10
        ? "0" + currentdate.getMinutes()
        : currentdate.getMinutes()).toString() +
     
      (currentdate.getSeconds() < 10
        ? "0" + currentdate.getSeconds()
        : currentdate.getSeconds()).toString() +
        (currentdate.getMilliseconds() < 100 
        ? "00" + currentdate.getMilliseconds():currentdate.getMilliseconds()).toString()
        console.log('กำลังPOST')
        
        await axios({
          method: "POST",
          url: "https://posappserver.herokuapp.com/checkbankdaily",
          data: {
            Branch_ID: localStorage.getItem('Branch_ID'),
            Store_ID: localStorage.getItem('Store_ID'),
          },
        }).then(async(resp) => {
          console.log("resp", resp);
          // var checktotal = resp.data[0].MoneyTotal;
          var total =
            B1000Param * 1000 +
            B500Param * 500 +
            B100Param * 100 +
            B50Param * 50 +
            B20Param * 20 +
            C10Param * 10 +
            C5Param * 5 +
            C2Param * 2 +
            C1Param * 1 +
            C50Param * 0.5 +
            C25Param * 0.25;
            if (
              resp.data[0].B1000 >= B1000Param &&
              resp.data[0].B500 >= B500Param &&
              resp.data[0].B100 >= B100Param &&
              resp.data[0].B50 >= B50Param &&
              resp.data[0].B20 >= B20Param &&
              resp.data[0].C10 >= C10Param &&
              resp.data[0].C5 >= C5Param &&
              resp.data[0].C2 >= C2Param &&
              resp.data[0].C1 >= C1Param &&
              resp.data[0].C50 >= C50Param &&
              resp.data[0].C25 >= C25Param &&
              total == value2
            ) {
              await axios.post('https://posappserver.herokuapp.com/sellgoods-withdraw',{
                DateAdd: dateOnAdd,
                GenDate: genDate,
                B1000Add: B1000Param,
                B500Add: B500Param,
                B100Add: B100Param,
                B50Add: B50Param,
                B20Add: B20Param,
                C10Add: C10Param,
                C5Add: C5Param,
                C2Add: C2Param,
                C1Add: C1Param,
                C50Add: C50Param,
                C25Add: C25Param,
                MoneyTotal: value2,
                Branch_ID: localStorage.getItem('Branch_ID'),
                ID: localStorage.getItem('ID'),
                Store_ID: localStorage.getItem('Store_ID')
          }).then((res)=>console.log('SERVER',res))

            } else {
              setModalAlert(!modalAlert)
             
            }
     
        });



        
  }

  const Sell = () => {
    if(MoneyTotal < Money - GoodsPrice) return setModalAlert(!modalAlert)
    if (parseFloat(Money) < parseFloat(GoodsPrice)) {
      return alert("ยอดเงินไม่เพียงพอสำหรับการซื้อ");
    }else{
      return onExchange()
    }
     
  }

  useEffect(()=>{
    GetBankDaily()
  },[])
    


  const onExchange = () => {
      var value = Money - GoodsPrice;
      var value2 = Money - GoodsPrice
      var temp = MoneyTotal - value2
      setMoneyTotal(temp)
      setChange(value)
      console.log("จำนวนเงินที่ต้องทอน: ",value)
      if (value >= 1000) {
        var Pay = Math.floor(value / 1000);
        value = value - Pay * 1000;
        if (Pay > B1000) {
          var ex = Pay - B1000;
          value = value + ex * 1000;
          Pay = B1000;
          setB1000(0);
        } else {
          setB1000(B1000 - Pay);
        }
        console.log("จำนวนแบงค์ 1000: ",Pay)
        ChangeText.B1000 = "จำนวนแบงค์ 1000: " + Pay
        var B1000Param = Pay
        
        setB1000Add(Pay)
      }
      if (value >= 500) {
        var Pay = Math.floor(value / 500);
        value = value - Pay * 500;
        if (Pay > B500) {
          var ex = Pay - B500;
          value = value + ex * 500;
          Pay = B500;
          setB500(0);
        } else {
          setB500(B500 - Pay);
        }
        console.log("จำนวนแบงค์ 500: ",Pay)
        ChangeText.B500 = "จำนวนแบงค์ 500: " + Pay

        var B500Param = Pay
        setB500Add(Pay)
        
      }
      if (value >= 100) {
        var Pay = Math.floor(value / 100);
        value = value - Pay * 100;
        if (Pay > B100) {
          var ex = Pay - B100;
          value = value + ex * 100;
          Pay = B100;
          setB100(0);
        } else {
          setB100(B100 - Pay);
        }
        console.log("จำนวนแบงค์ 100: ",Pay)
        ChangeText.B100 = "จำนวนแบงค์ 100: " + Pay
        var B100Param = Pay
        setB100Add(Pay)
      }
      if (value >= 50) {
        var Pay = Math.floor(value / 50);
        value = value - Pay * 50;
        if (Pay > B50) {
          var ex = Pay - B50;
          value = value + ex * 50;
          Pay = B50;
          setB50(0);
        } else {
          setB50(B50 - Pay);
        }
        console.log("จำนวนแบงค์ 50: ",Pay)
        ChangeText.B50 = "จำนวนแบงค์ 50: " + Pay

        var B50Param = Pay
        setB50Add(Pay)
      }
      if (value >= 20) {
        var Pay = Math.floor(value / 20);
        value = value - Pay * 20;
        if (Pay > B20) {
          var ex = Pay - B20;
          value = value + ex * 20;
          Pay = B20;
          setB20(0);
        } else {
          setB20(B20 - Pay);
        }
        console.log("จำนวนแบงค์ 20: ",Pay)
        ChangeText.B20 = "จำนวนแบงค์ 20: " + Pay
        var B20Param = Pay
        setB20Add(Pay)
      }
      if (value >= 10) {
        var Pay = Math.floor(value / 10);
        value = value - Pay * 10;
        if (Pay > C10) {
          var ex = Pay -C10;
          value = value + ex * 10;
          Pay = C10;
          setC10(0);
        } else {
          setC10(C10 - Pay);
        }
        console.log("จำนวนเหรียญ 10: ",Pay)
        ChangeText.C10 = "จำนวนเหรียญ 10: " + Pay
        var C10Param = Pay
        setC10Add(Pay)
      }

      if (value >= 5) {
        var Pay = Math.floor(value / 5);
        value = value - Pay * 5;
        if (Pay > C5) {
          var ex = Pay -C5;
          value = value + ex * 5;
          Pay = C5;
          setC5(0);
        } else {
          setC5(C5 - Pay);
        }
        console.log("จำนวนเหรียญ 5: ",Pay)
        ChangeText.C5 = "จำนวนเหรียญ 5: " + Pay
        var C5Param = Pay
        setC5Add(Pay)
      }
      if (value >= 2) {
        var Pay = Math.floor(value / 2);
        value = value - Pay * 2;
        if (Pay > C2) {
          var ex = Pay -C2;
          value = value + ex * 2;
          Pay = C2;
          setC2(0);
        } else {
          setC2(C2 - Pay);
        }
        console.log("จำนวนเหรียญ 2: ",Pay)
        ChangeText.C2 = "จำนวนเหรียญ 2: " + Pay

        var C2Param = Pay
        setC2Add(Pay)
      }
      if (value >= 1) {
        var Pay = Math.floor(value / 1);
        value = value - Pay * 1;
        if (Pay > C1) {
          var ex = Pay -C1;
          value = value + ex * 1;
          Pay = C1;
          setC1(0);
        } else {
          setC1(C1 - Pay);
        }
        console.log("จำนวนเหรียญ 1: ",Pay)
        ChangeText.C1 = "จำนวนเหรียญ 1: " + Pay

        var C1Param = Pay
        setC1Add(Pay)
      }
      if (value >= 0.5) {
        var Pay = Math.floor(value / 0.5);
        value = value - Pay * 0.5;
        if (Pay > C1) {
          var ex = Pay -C50;
          value = value + ex * 0.5;
          Pay = C50;
          setC50(0);
        } else {
          setC50(C50 - Pay);
        }
        console.log("จำนวนเหรียญ 50 สตางค์: ",Pay)
        ChangeText.C50 = "จำนวนเหรียญ 50 สตางค์: " + Pay

        var C50Param = Pay
        setC50Add(Pay)
      }
      if (value >= 0.25) {
        var Pay = Math.floor(value / 0.25);
        value = value - Pay * 0.25;
        if (Pay > C25) {
          var ex = Pay -C25;
          value = value + ex * 0.25;
          Pay = C25;
          setC25(0);
        } else {
          setC25(C25 - Pay);
        }
        console.log("จำนวนเหรียญ 25 สตางค์: ",Pay)
        ChangeText.C25 = "จำนวนเหรียญ 25 สตางค์: " + Pay

        var C25Param = Pay
        setC25Add(Pay)
      }
      SellAPI(value2,C2Param,B50Param,B20Param,B1000Param,B500Param,B100Param,C10Param,C5Param,C1Param,C50Param,C25Param)
      setModalSuccess(!modalSuccess)


    
    
  };

    return (
      <>
      <Modal isOpen={show} toggle={toggle} className='testModal' centered>
            <ModalHeader toggle={toggle}>หน้าต่างชำระ</ModalHeader>
            <ModalBody>
                <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'flex-start'}}>
                    <div style={{width:'100%'}}>
                        <h4>ยอดชำระ</h4>
                        <div className="CasheerBoxSell" >
                            <div className="TotalBox">
                                <p>{GoodsPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <h4>จำนวนเงิน</h4>
                    <Input value={Money} onChange={(e)=>setMoney(e.target.value === '' ? 0:parseFloat(e.target.value))}/>
                    <div style={{marginTop:'1rem' ,display:'flex' ,flexWrap:'wrap'}}>
                      <div className="RecieveMoney" style={{width:'100%'}} onClick={()=>{
                              setMoney(GoodsPrice)
                              }}>ชำระพอดี
                        </div>
                    </div>
                    <div style={{ borderTop: "2px solid rgba(163, 163, 163, 0.41)", width:'100%' , marginTop:'1rem'}}></div>
                    <div style={{marginTop:'1rem' ,display:'flex' ,flexWrap:'wrap'}}>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+1000)
                            }}>1000</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+500)
                            }}>500</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+100)
                            }}>100</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+50)
                            }}>50</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+20)
                            }}>20</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+10)
                            }}>10</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+5)
                            }}>5</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+2)
                            }}>2</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+1)
                            }}>1</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+0.5)
                            }}>0.5</div>
                        <div className="RecieveMoney" onClick={()=>{
                            setMoney(Money+0.25)
                            }}>0.25</div>
                    </div>
                    
                </div>

            </ModalBody>
            <ModalFooter>
            <Button color="success"  onClick={()=>{
              Sell()
              // if(true){
              //   setModalAlert(!modalAlert)
              // }else{
              //   onExchange()
              // }
               // toggle()
                }}>ชำระเงิน</Button>{' '}
            <Button color="danger" onClick={toggle}>ยกเลิก</Button>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalAlert} toggle={()=>setModalAlert(!modalAlert)} className='testModal' centered>
            <ModalHeader  toggle={()=>setModalAlert(!modalAlert)}>เงินทอนหมด</ModalHeader>
            <ModalBody>
              <h1>เบิกเงินทอนก่อน</h1>
            </ModalBody>
            <ModalFooter>
            <Link to='/Withdraw'> <Button color="warning"  onClick={()=>{
               setModalAlert(!modalAlert)
                }}>เบิกเงินทอน</Button></Link>
            </ModalFooter>
        </Modal>

        <Modal isOpen={modalSuccess} toggle={()=>{
               setModalSuccess(!modalSuccess)
               window.location.reload()
                }} className='testModal' centered>
            <ModalHeader  toggle={()=>{
               setModalSuccess(!modalSuccess)
               window.location.reload()
                }}>ทอนเงิน</ModalHeader>
            <ModalBody>
            <div style={{width:'100%' , marginTop:'1rem'}}>
                        <h4>ยอดทอน</h4>
                        <div className="CasheerBoxSell" >
                            <div className="TotalBox" style={{color:'red'}}>
                                <p>{Change.toFixed(2)}</p>
                            </div>
                        </div>
                        <div style={{display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
                          <div>
                            <h5>แบงค์ที่ต้องทอน</h5>
                          </div>
                          <p>{ChangeText.B1000}</p>
                          <p>{ChangeText.B500}</p>
                          <p>{ChangeText.B100}</p>
                          <p>{ChangeText.B50}</p>
                          <p>{ChangeText.B20}</p>
                          <p>{ChangeText.C10}</p>
                          <p>{ChangeText.C5}</p>
                          <p>{ChangeText.C2}</p>
                          <p>{ChangeText.C1}</p>
                          <p>{ChangeText.C50}</p>
                          <p>{ChangeText.C25}</p>
                        </div>

                    </div>
            </ModalBody>
            <ModalFooter>
            <Button color="warning"  onClick={()=>{
               alert('ใบเสร็จ')
               setModalSuccess(!modalSuccess)
              window.location.reload()
                }}>พิมพ์ใบเสร็จ</Button>
            </ModalFooter>
        </Modal>


      </>
        
    )
}

export default ModalSell
