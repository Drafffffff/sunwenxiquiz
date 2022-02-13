import "./App.css";
import "bulma/css/bulma.min.css";
import { Button, Form } from "react-bulma-components";
import { useEffect, useState } from "react";
import Complete from "./complete";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://hurbrteqzoptqzpkonng.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1cmJydGVxem9wdHF6cGtvbm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ1OTI2MzIsImV4cCI6MTk2MDE2ODYzMn0.c0mi_DdEG_WZm5AEAZESo3zo9pSfxsq8HqMY3V7omKw"
);
function App() {
  const [dataList, setDataList] = useState(0);
  const [subject, setSubject] = useState("高校学生");
  const [times, setTimes] = useState(1);
  const [completeflag, setCompleteflag] = useState(0);
  const [clickable, setClickable] = useState(1);
  const wordList = [
    "中性的",
    "带有复古感的",
    "圆润的",
    "撞色的",
    "包面定制化的",
    "有展览信息的",
    "有多种背法的",
    "容量大的",
    "可变形的",
    "硬挺的",
    "有肌理的",
    "不同材质搭配的",
  ];
  function init() {
    const tmpList = [];
    for (let i = 0; i < 12; i++) {
      tmpList.push(Math.random() >= 0.5);
    }
    setDataList(tmpList);
  }
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function makeText() {
    let text = "";
    for (let i = 0; i < dataList.length; i++) {
      if (dataList[i]) {
        text += wordList[i];
        text += "　";
      }
    }
    text = text.substr(0, text.length - 1);
    return text;
  }
  function makeNText() {
    let text = "";
    for (let i = 0; i < dataList.length; i++) {
      if (!dataList[i]) {
        text += wordList[i];
        text += "　";
      }
    }
    text = text.substr(0, text.length - 1);
    return text;
  }
  async function likeSubmit() {
    setClickable(0);
    const d = { ...dataList };
    d.user = subject;
    d.like = 1;
    const { data, error } = await supabase.from("data").insert([d]);
    console.log(data, error);
    if (timesChange()) {
      init();
      console.log("likeSubmit");
      setClickable(1);
    }
  }
  async function dislikeSubmit() {
    setClickable(0);
    const d = { ...dataList };
    d.user = subject;
    d.like = 0;
    const { data, error } = await supabase.from("data").insert([d]);
    console.log(data, error);
    if (timesChange()) {
      init();
      console.log("dislikeSubmit");
      setClickable(1);
    }
  }
  function timesChange() {
    if (times < 10) {
      setTimes(times + 1);
      return true;
    } else {
      setCompleteflag(1);
      return false;
    }
  }
  if (completeflag) {
    return <Complete />;
  } else {
    return (
      <div className="App">
        <form className="form">
          <Form.Field>
            <Form.Label>
              您好！我是中国美术学院艺术设计学的一名毕业生，毕业作品涉及到“用回收线下展览物料”设计成的电脑包的相关研究，以下问卷中有10道问题需要您的助力作答。您的作答对我至关重要，超级感谢您对我的毕业撑腰！
            </Form.Label>
          </Form.Field>
          <Form.Field className="shenfen">
            <Form.Label >您的身份是</Form.Label>
            <Form.Control>
              <Form.Select
                value={subject}
                onChange={e => {
                  return setSubject(e.target.value);
                }}
              >
                <option value="高校学生">高校学生</option>
                <option value="高校教师">高校教师</option>
                <option value="企业工作者">企业工作者</option>
                <option value="环保主义者">环保主义者</option>
                <option value="独立策展人">独立策展人</option>
                <option value="vintage爱好者">vintage爱好者</option>
              </Form.Select>
            </Form.Control>
          </Form.Field>
          <Form.Field className="wenti">
            <Form.Label>您是否会喜欢带有以下描述特征的电脑包？</Form.Label>
          </Form.Field>
          <Form.Field className="textField">
            <Form.Label size="medium" className="its">它是</Form.Label>
            <Form.Label size="medium"> {makeText()}</Form.Label>
            <Form.Label size="medium" className="itsnot">但不是</Form.Label>
            <Form.Label size="medium"> {makeNText()}</Form.Label>
          </Form.Field>
          <Form.Field className="submit">
            <Button.Group align={"default"} size={"default"}>
              <Button
                renderAs="span"
                color="success"
                onClick={clickable ? likeSubmit : null}
              >
                喜欢
              </Button>
              <Button
                renderAs="span"
                color="danger"
                onClick={clickable ? dislikeSubmit : null}
              >
                不喜欢
              </Button>
            </Button.Group>
          </Form.Field>
          <p>{times}/10</p>
        </form>
      </div>
    );
  }
}

export default App;
