/*
 * @Author: wangqiaoling
 * @Date: 2023-11-10 16:22:34
 * @LastEditTime: 2023-11-10 18:02:11
 * @LastEditors: wangqiaoling
 * @Description: 诊疗助手相关逻辑
 */
import { ListItem } from "@/components/switcher/data";
import { getknowledgeList } from "@api/treatement";
import { AxiosResponse } from "axios";

export function useSwitch() {
  // 项目数据
  const listData = reactive<ListItem[]>([
    {
      show_type: "传染病",
      content: [
        {
          uuid: "92faf94430a342dc93af74b89fe2648e",
          name: "新型冠状病毒感染基层防控指导意见 （第一版）",
        },
        {
          uuid: "4c31f1605dc642e8a73671e65683fcbc",
          name: "慢性乙型肝炎基层诊疗指南（2020年）",
        },
        {
          uuid: "50105013bdbd40d4877b474fb6182fbd",
          name: "社区老年人常见感染性疾病疫苗应用专家共识",
        },
        {
          uuid: "47d5e960e0ab44c2891ff6508fcb19be",
          name: "慢性乙型肝炎基层诊疗指南（实践版·2020）",
        },
      ],
    },
    {
      show_type: "内分泌",
      content: [
        {
          uuid: "ead364d71244482083c08478e4047a6e",
          name: "原发性骨质疏松症基层诊疗指南（2019年）",
        },
        {
          uuid: "af4fc5b16aae4c2a92097ccca908be9d",
          name: "原发性骨质疏松症基层诊疗指南（实践版· 2019）",
        },
        {
          uuid: "89b59837c67a42808368b3e874a34af0",
          name: "基层2型糖尿病胰岛素应用专家共识",
        },
        {
          uuid: "d7942851aee0435fa2e517de4560e531",
          name: "糖尿病周围神经病基层诊治管理专家指导意见（2019年）",
        },
        {
          uuid: "0ecb1cf87d924744be544a8f9abd3481",
          name: "肥胖症基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "5c22305eec6a41aa9c5d8eb3685407d5",
          name: "甲状腺功能亢进症基层诊疗指南 （实践版·2019）",
        },
        {
          uuid: "a804650048f4411c96b584e4dc23d625",
          name: "肥胖症基层诊疗指南（2019年）",
        },
        {
          uuid: "b7c5d06f732d472b91ec683de3b249ae",
          name: "甲状腺功能减退症基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "e927e0299aa246fab62d01c21934f50d",
          name: "甲状腺功能减退症基层诊疗指南（2019年）",
        },
        {
          uuid: "965eb0847c534a818aa2c8396fbd444a",
          name: "甲状腺功能亢进症基层诊疗指南（2019年）",
        },
        {
          uuid: "9cfc91ae75914c3dae597d8451d4d4a0",
          name: "2型糖尿病基层诊疗指南（实践版·2019）",
        },
      ],
    },
    {
      show_type: "呼吸病",
      content: [
        {
          uuid: "cfd5718726094297a1b5e8779af39b68",
          name: "咳嗽基层诊疗指南（2018年）",
        },
        {
          uuid: "f8d48321824642f9bf3c1cfd497804c7",
          name: "成人社区获得性肺炎基层诊疗指南（2018年）",
        },
        {
          uuid: "237fd93fd3bb4af683d35896920c6613",
          name: "成人社区获得性肺炎基层诊疗指南（实践版_2018）",
        },
        {
          uuid: "671fd90959d24cee8d1e33556d706c27",
          name: "支气管哮喘基层诊疗指南（2018年）",
        },
        {
          uuid: "f2cd90bb55bd400599c4344dc7411707",
          name: "支气管哮喘基层诊疗指南（实践版·2018）",
        },
        {
          uuid: "18f2c2c2474541a49697daecc3516c95",
          name: "成人阻塞性睡眠呼吸暂停基层诊疗指南（实践版_2018）",
        },
        {
          uuid: "38ea5417037540d884eb198238dd2cf6",
          name: "成人阻塞性睡眠呼吸暂停基层诊疗指南（2018）",
        },
        {
          uuid: "1c898bc741c44e68bce9d014140d9e86",
          name: "慢性阻塞性肺疾病基层诊疗指南（2018年）",
        },
        {
          uuid: "3fd7fd522fea4cfe980d4f5af4881191",
          name: "慢性阻塞性肺疾病基层诊疗指南（实践版_2018）",
        },
        {
          uuid: "6ba13fd033114b76a05beb9acf52a522",
          name: "急性气管⁃支气管炎基层诊疗指南（2018年）",
        },
        {
          uuid: "18c3b403ccd344da89d4a8460ccaec3c",
          name: "急性气管-支气管炎基层诊疗指南（实践版·2018）",
        },
        {
          uuid: "9b65858ad0ae4c0b8f851ccd1156000e",
          name: "咳嗽基层诊疗指南（实践版·2018）",
        },
        {
          uuid: "8cf4056e59d3487181a3d91dad41e85f",
          name: "肺结核基层诊疗指南（实践版_2018）",
        },
        {
          uuid: "5b63929f81354203b2ecb4ee9db0d800",
          name: "慢性肺源性心脏病基层诊疗指南（实践版·2018）",
        },
        {
          uuid: "47f060e2fafe4a908923a62097208eaf",
          name: "慢性肺源性心脏病基层诊疗指南（2018年）",
        },
        {
          uuid: "8f515051466e49efb137691d7a2cc2f1",
          name: "常规肺功能检查基层指南（2018年）",
        },
        {
          uuid: "a6e4f405df14466d99ce392a041359b4",
          name: "肺结核基层诊疗指南（2018年）",
        },
        {
          uuid: "a583b562670d4427b950c963a22696ce",
          name: "急性上呼吸道感染基层诊疗指南（实践版_2018）",
        },
        {
          uuid: "158b6bbee4bf49c493ffdab75410f2ab",
          name: "急性上呼吸道感染基层诊疗指南（2018年）",
        },
      ],
    },
    {
      show_type: "心血管病",
      content: [
        {
          uuid: "8fa15efb9c034acaa630b2fac07c0314",
          name: "中国居民膳食指南（2022）",
        },
        {
          uuid: "9136c870d7984c3f9321c1b6291a63d1",
          name: "中国糖尿病医学营养治疗指南（2022版）",
        },
        {
          uuid: "bdfa679d51cd49499057a80c6283ba9a",
          name: "中国糖尿病运动治疗指南",
        },
        {
          uuid: "d6d782dd33b448098d774840e348a03a",
          name: "室上性心动过速基层诊疗指南（2019年）",
        },
        {
          uuid: "4fc15dbec5ca4216bf72562a05d96452",
          name: "早搏基层诊疗指南（2019年）",
        },
        {
          uuid: "18b9fc8fc5ad430ca973621f3fcbc551",
          name: "早搏基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "76abcd4912cb4e9bac7c72f424f078c1",
          name: "胸痛基层诊疗指南（2019年）",
        },
        {
          uuid: "7da886470088489b87836391a955d672",
          name: "慢性心力衰竭基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "a57a1fd1f7474069a895a7bd02d481d1",
          name: "高血压基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "0641e124c0e94192b4c279fd49e67848",
          name: "慢性心力衰竭基层诊疗指南（2019年）",
        },
        {
          uuid: "7c6e5191e1014611852d60e4a1b72404",
          name: "急性心力衰竭基层诊疗指南（2019年）",
        },
        {
          uuid: "6bae7bc19784477881d1154b4b1399ac",
          name: "急性心力衰竭基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "838afb5b7ba1474ba5ce6c3493478443",
          name: "胸痛基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "873197d844084395b4a498d1d6ae382f",
          name: "心脏骤停基层诊疗指南（2019年）",
        },
        {
          uuid: "d82879f890a94db68b7d655d19bbb60b",
          name: "心脏骤停基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "621c2ec01daf4bbfb4b30ca35304f125",
          name: "室性心动过速基层诊疗指南（2019年）",
        },
        {
          uuid: "838e6065bbc64da3b4e9618c221a0433",
          name: "室性心动过速基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "e2029b4aff4d4e49ba558e0f3598b0f9",
          name: "血脂异常基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "0fade86bf29d4a11a558e1e27fa9b728",
          name: "血脂异常基层诊疗指南（2019年）",
        },
        {
          uuid: "692bca17dc784bed8a0d54329da6ea9a",
          name: "高血压基层诊疗指南（2019年）",
        },
        {
          uuid: "ecbe981061d74e909cd605888e51c876",
          name: "非ST段抬高型急性冠状动脉综合征基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "64d56c5437114604a3a0ed696c62c0ed",
          name: "稳定性冠心病基层诊疗指南（2020年）",
        },
        {
          uuid: "53c2a6ce89ad4ae3b8cf7be836e62237",
          name: "心房颤动基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "1d1d13e93ca34f878d4554272a831130",
          name: "预激综合征基层诊疗指南（2019年）",
        },
        {
          uuid: "5f89e2fbd2a14f4d9b980b60e56a1adf",
          name: "ST段抬高型心肌梗死基层诊疗指南 （实践版·2019）",
        },
        {
          uuid: "a8d95dedf23b4239a7d60c4a4473b37e",
          name: "ST段抬高型心肌梗死基层诊疗指南（2019年）",
        },
        {
          uuid: "b9e12bad2c6b47cebc14bce1e87b1784",
          name: "室上性心动过速基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "00357f3ee1e64ce7a9927751c0385c54",
          name: "心房颤动基层诊疗指南（2019年）",
        },
        {
          uuid: "ba1386f66e64471caaea2aa06a1a54f5",
          name: "稳定性冠心病基层诊疗指南（实践版_2020）",
        },
      ],
    },
    {
      show_type: "消化病",
      content: [
        {
          uuid: "efe036ba5cd646aa991d4e3b589b15a4",
          name: "酒精性肝病基层诊疗指南（2019年）",
        },
        {
          uuid: "7e7277635b574b748ffaadfc7cef03c2",
          name: "酒精性肝病基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "31d5e689acc64309b7e80b0f633647d0",
          name: "慢性便秘基层诊疗指南（2019年）",
        },
        {
          uuid: "c9d4238407da4f648f28336189eede08",
          name: "慢性便秘基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "00c838fb224c41919d8e0154d3bc9629",
          name: "慢性胃炎基层诊疗指南（2019年）",
        },
        {
          uuid: "d076c0b3da48475eb2b8b8ac66f3f01a",
          name: "幽门螺杆菌感染基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "478c3c3afb3b4915b820995eb9e35e05",
          name: "幽门螺杆菌感染基层诊疗指南（2019年）",
        },
        {
          uuid: "0058bf5824bd456bb68bf65d5e30de24",
          name: "急性胰腺炎基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "7bb1b8fbc3244e1b8c2ca6b5f861903b",
          name: "急性胰腺炎基层诊疗指南（2019年）",
        },
        {
          uuid: "4586c08bfce3409f9d88270c64c70a2b",
          name: "胃食管反流病基层诊疗指南（2019年）",
        },
        {
          uuid: "006e9b497bec4ae7807ccd34c24a7190",
          name: "胃食管反流病基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "2a1bfd92f93e4a018d08b637540c5b6b",
          name: "慢性腹痛基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "d875c6f51ca148acbdc3df749adc00c4",
          name: "慢性腹痛基层诊疗指南（2019 年）",
        },
        {
          uuid: "b96b522ca74946578b8c7840c8bdddc6",
          name: "慢性腹泻基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "011216f884e94086a2910384425de583",
          name: "慢性腹泻基层诊疗指南（2019年）",
        },
        {
          uuid: "bb0c301ed0fd4d40a6251807eb6d24f0",
          name: "药物性肝损伤基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "730e0c9a12064ccfbcb87548ab7cda74",
          name: "药物性肝损伤基层诊疗指南（2019年）",
        },
        {
          uuid: "925e10ee899d456ab87681f643e8bdce",
          name: "慢性胃炎基层诊疗指南（实践版_2019）",
        },
      ],
    },
    {
      show_type: "皮肤病",
      content: [
        {
          uuid: "571b78d0f9154a009b29d469150b1fa4",
          name: "特应性皮炎基层诊疗指南（2022年）",
        },
        {
          uuid: "bae3a51de169425a9385833b458977ce",
          name: "银屑病基层诊疗指南（2022年）",
        },
      ],
    },
    {
      show_type: "神经病",
      content: [
        {
          uuid: "e2bd5377ac414b8182314d17d24b484e",
          name: "帕金森病基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "d31814d7303c4d6db537e044923f4181",
          name: "帕金森病基层诊疗指南（2019年）",
        },
        {
          uuid: "55f58f08186942c1ad31e0b073309525",
          name: "头晕眩晕基层诊疗指南（实践版·2019）",
        },
        {
          uuid: "0f888b9f50cb4d70a9a6b732b69c485c",
          name: "头晕眩晕基层诊疗指南（2019年）",
        },
        {
          uuid: "b79e166ccaef47f7b03c4abaf52bd8cd",
          name: "缺血性卒中基层诊疗指南（实践版·2021）",
        },
        {
          uuid: "aa2971500edb4b779c689e0f40f37a9d",
          name: "缺血性卒中基层诊疗指南（2021年）",
        },
        {
          uuid: "d8cdc97c76dc480aa1221702a4e9c441",
          name: "特发性震颤基层诊疗指南（实践版·2021）",
        },
        {
          uuid: "052290fb72bb4b00b70f7158f9649c30",
          name: "特发性震颤基层诊疗指南（2021年）",
        },
      ],
    },
    {
      show_type: "精神病学",
      content: [
        {
          uuid: "fcff76e8e19f4899b618b95b1df9bdae",
          name: "抑郁症基层诊疗指南（实践版_2021）",
        },
        {
          uuid: "498b3e91aadb4f3291f7eedbc172d2ad",
          name: "抑郁症基层诊疗指南（2021年）",
        },
        {
          uuid: "cf4e05ff5e1d42588e0887d285410155",
          name: "广泛性焦虑障碍基层诊疗指南（实践版_2021）",
        },
        {
          uuid: "98209c943deb46928f597296c5d41768",
          name: "广泛性焦虑障碍基层诊疗指南（2021年）",
        },
      ],
    },
    {
      show_type: "风湿免疫病",
      content: [
        {
          uuid: "23a8a60eae4b46b2b4a01d1157de9076",
          name: "痛风及高尿酸血症基层诊疗指南（实践版_2019）",
        },
        {
          uuid: "24f61c4b5ee845278afdd1be4f10c587",
          name: "痛风及高尿酸血症基层诊疗指南（2019年）",
        },
      ],
    },
  ]);
  const loadList = () => {
    getknowledgeList(2, "", 0, 1).then((res: AxiosResponse<ListItem[]>) => {
      console.log("res-", res);
      listData = res;
    });
  };
  return {
    loadList,
    listData,
  };
}
