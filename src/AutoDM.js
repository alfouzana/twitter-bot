const T = require("./Twit.js");
const my_user_name = require("../config").userName;
const timeout = 1000 * 60 * 5; // timeout to send the message 5 min

const AutoDM = () => {
  const stream = T.stream("user");
  console.log("Start Sending Auto Direct Message 🚀🚀🚀");
  stream.on("follow", SendMessage);
};

const SendMessage = user => {
  const { screen_name, name } = user.source;

  const obj = {
    screen_name,
    text: GenerateMessage(name)
  };
  // the follow stream track if I follow author person too.
  if (screen_name != my_user_name) {
    console.log(" 🎉🎉🎉🎉 New Follower  🎉🎉🎉🎉🎉 ");
    setTimeout(() => {
      T.post("direct_messages/new", obj)
        .catch(err => {
          console.error("error", err.stack);
        })
        .then(result => {
          console.log(`Message sent successfully To  ${screen_name}  💪💪`);
        });
    }, timeout);
  }
};
const GenerateMessage = name => {
  const days = [
    "الأحد",
    "الأثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
  ];
  const d = new Date();
  const dayName = days[d.getDay()];
  return `هلا ${name} شكراً للإضافة الرائعة، إسمي عبدالله الفوزان وانا شخص أعمل على الإنترنت من عام ٢٠١٧! شلون يعني اعمل على الإنترنت؟ يعني إني جعلت الإنترنت مصدر رزقي الوحيد! واليوم انا موجود على تويتر لمشاركة الأشياء اللي تعلمتها من خلال إنشاء أعمال تجارية عبر الإنترنت. تخيل ${name} مافيه مكان على ارض الواقع تقدر تتعلم منه كيف تشتغل على الإنترنت وعن بعد! عشان كذا ابيك تدخل على الرابط اللي تحت وتتعلم كيف تشتغل على الإنترنت، لا تخاف مابي منك ولا هللة اللحين! كل اللي ابيه منك إنك تتعلم اول خطوة لك لتغير حياتك وكيف تخلي الإنترنت مصدر دخلك.. جاهز؟ إضغط على الرابط اللي تحت! \n https://entrdemy.com/live `;
};

module.exports = AutoDM;
