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
    "优雅的",
    "中性的",
    "运动的",
    "可爱的",
    "简约的",
    "个性的",
    "时尚的",
    "手工的",
    "有文字的",
    "有LOGO的",
    "大面积纯色的",
    "有色块分割的",
    "有私定信息的",
    "独一无二的",
    "明快的",
    "有细节的",
    "可双肩背的",
    "可斜背的",
    "可手提的",
    "可单肩斜跨的",
    "可拆卸的",
    "有隔层的",
    "易收纳的",
    "节省空间的",
    "硬挺的",
    "光滑的",
    "厚重的",
    "精致的",
    "有肌理的",
    "圆润的",
    "配件较多的",
    "材质统一的",
  ];
  function init() {
    const tmpList = [];
    for (let i = 0; i < 32; i++) {
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
        text += ",";
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
              您好！我是中国美术学院 2022
              届艺术设计学科的一名毕业生，毕业论文研究涉及到电脑包的相关设计，以下问卷中有
              10 道问题需要您的助力作答，超级感谢您为我的毕业撑腰！-
            </Form.Label>
          </Form.Field>
          <Form.Field className="shenfen">
            <Form.Label size="medium">您的身份是</Form.Label>
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
            <Form.Label>您是否会喜欢一个</Form.Label>
          </Form.Field>
          <Form.Field className="textField">
            <Form.Label size="medium"> {makeText()}</Form.Label>
          </Form.Field>
          <Form.Field>
            <Form.Label> 的电脑包？</Form.Label>
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
