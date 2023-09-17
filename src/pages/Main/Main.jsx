import React from "react";

import Dropdown from "../../components/Dropdown/Dropdown";

import { Input, Button } from "reactstrap";

import { JOB_DATAS, CAREER_DATAS, LEVEL_DATAS } from "./constants";

import styles from "./Main.module.scss";

const getDropdownItems = (datas, setter, key) => {
  return datas.map(({ title }) => ({
    title,
    onClick: () => setter((prev) => ({ ...prev, [key]: title })),
  }));
};

const Main = () => {
  const [form, setForm] = React.useState({
    job: "직무 선택",
    career: "연차 선택",
    level: "난이도 선택",
    requirement: "",
  });

  const jobItems = getDropdownItems(JOB_DATAS, setForm, "job");
  const careerItems = getDropdownItems(CAREER_DATAS, setForm, "career");
  const levelItems = getDropdownItems(LEVEL_DATAS, setForm, "level");

  const isDisabled =
    form.job === "직무 선택" ||
    form.career === "연차 선택" ||
    form.level === "난이도 선택" ||
    form.requirement === "";

  return (
    <div className={styles.Main}>
      <div className={styles.Container}>
        <h2>사전 데이터 입력</h2>
        <div className={styles.Section}>
          <h4>직무</h4>
          <Dropdown
            toggleClassName={styles.DropdownToggle}
            itemClassName={styles.DropdownItem}
            selectItemDatas={jobItems}
            selectedItemText={form.job}
            color="outline-dark"
          />
        </div>
        <div className={styles.Section}>
          <h4>연차</h4>
          <Dropdown
            toggleClassName={styles.DropdownToggle}
            itemClassName={styles.DropdownItem}
            selectItemDatas={careerItems}
            selectedItemText={form.career}
            color="outline-dark"
          />
        </div>
        <div className={styles.Section}>
          <h4>난이도</h4>
          <Dropdown
            toggleClassName={styles.DropdownToggle}
            itemClassName={styles.DropdownItem}
            selectItemDatas={levelItems}
            selectedItemText={form.level}
            color="outline-dark"
          />
        </div>
        <div className={styles.Section}>
          <h4>자격 요건</h4>
          <Input
            type="textarea"
            placeholder="기업의 자격 요건을 입력해주세요."
            value={form.requirement}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, requirement: e.target.value }))
            }
          />
        </div>
      </div>
      <Button size="lg" color="primary" disabled={isDisabled} block>
        다음
      </Button>
    </div>
  );
};

export default Main;
