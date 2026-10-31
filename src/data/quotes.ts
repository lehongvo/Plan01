import { bi, type Text } from "@/lib/text";

type PhaseQuotes = {
  /** One line per day of the phase, in order (wraps if the phase runs longer). */
  lines: Text[];
  /** Second-to-last day of the phase. */
  almost: Text;
  /** Last day of the phase. */
  done: Text;
};

// Phase boundaries move with the start date, so lines that name a boundary are
// picked from the schedule (almost / done) instead of a fixed day number.
export const PHASE_QUOTES: Record<number, PhaseQuotes> = {
  1: {
    lines: [
      bi("Day one is the hardest. You already showed up.", "Ngày đầu tiên là khó nhất. Và bạn đã có mặt."),
      bi("5 AM is quiet. That quiet is your advantage.", "5 giờ sáng rất yên tĩnh. Sự yên tĩnh đó là lợi thế của bạn."),
      bi(
        "The compiler is strict so your code can be trusted. Let it teach you.",
        "Compiler khắt khe để code của bạn đáng tin. Hãy để nó dạy bạn.",
      ),
      bi("Small steps every day beat big plans you never start.", "Bước nhỏ mỗi ngày thắng kế hoạch lớn không bao giờ bắt đầu."),
      bi("You don't need motivation today. You need the next slot.", "Hôm nay không cần cảm hứng. Chỉ cần làm xong slot tiếp theo."),
      bi(
        "Ownership feels hard because it is new, not because you can't.",
        "Ownership thấy khó vì nó mới, không phải vì bạn không làm được.",
      ),
      bi("One week done. Keep the chain alive.", "Xong một tuần. Giữ chuỗi tiếp tục nhé."),
      bi("Every error message is a free lesson.", "Mỗi thông báo lỗi là một bài học miễn phí."),
      bi(
        "Nobody sees your 5 AM work. Your future clients will.",
        "Không ai thấy bạn học lúc 5 giờ sáng. Khách hàng tương lai của bạn sẽ thấy.",
      ),
      bi("Write the code, break it, fix it. That's how it sticks.", "Viết code, làm nó lỗi, rồi sửa. Đó là cách để nhớ lâu."),
      bi(
        "Progress is quiet. Keep going even when you can't see it yet.",
        "Tiến bộ thường lặng lẽ. Cứ đi tiếp, kể cả khi chưa thấy rõ.",
      ),
      bi("Hard chapters end. Finish this one.", "Chương khó nào rồi cũng hết. Hoàn thành chương này đã."),
      bi("Ask “why” once more than yesterday.", "Hãy hỏi “tại sao” nhiều hơn hôm qua một lần."),
      bi("Two weeks in. The habit is starting to carry you.", "Hai tuần rồi. Thói quen bắt đầu kéo bạn đi."),
      bi("A green test is a small win. Collect them.", "Một test xanh là một chiến thắng nhỏ. Hãy gom thật nhiều."),
      bi("Tired is fine. Quitting is the only real failure here.", "Mệt cũng không sao. Bỏ cuộc mới là thất bại thật sự."),
      bi("Your CLI tool is proof you can ship Rust.", "Tool CLI của bạn là bằng chứng bạn ship được Rust."),
      bi("Clean code today saves a long night later.", "Code sạch hôm nay giúp bạn khỏi thức trắng mai sau."),
      bi("Rest is part of training. Sleep well tonight.", "Nghỉ ngơi cũng là luyện tập. Tối nay ngủ ngon nhé."),
      bi(
        "Don't compare your start to someone else's year five.",
        "Đừng so điểm xuất phát của bạn với năm thứ năm của người khác.",
      ),
    ],
    almost: bi("Almost done with phase 1. Finish strong.", "Sắp xong giai đoạn 1. Về đích thật mạnh."),
    done: bi(
      "Phase 1 complete. Your profile is live and your first proposals are out.",
      "Xong giai đoạn 1. Profile đã lên và những proposal đầu tiên đã gửi đi.",
    ),
  },
  2: {
    lines: [
      bi("New chain, same discipline. Welcome to Solana.", "Chain mới, kỷ luật cũ. Chào mừng đến với Solana."),
      bi("Accounts first, code second. Understand the model.", "Hiểu account trước, viết code sau. Nắm chắc mô hình."),
      bi(
        "Every expert once deployed a broken counter program.",
        "Chuyên gia nào cũng từng deploy một program counter bị lỗi.",
      ),
      bi("Read the docs slowly. Speed comes later.", "Đọc docs chậm thôi. Tốc độ sẽ đến sau."),
      bi(
        "A day you didn't feel like it, and did it anyway, counts double.",
        "Ngày không muốn học nhưng vẫn học, tính gấp đôi.",
      ),
      bi("Your Solidity years are an asset, not baggage.", "Những năm làm Solidity là tài sản, không phải gánh nặng."),
      bi("Four weeks of mornings. Look how far you've come.", "Bốn tuần dậy sớm. Nhìn lại xem bạn đã đi xa thế nào."),
      bi("PDAs click on the third try. Try again.", "PDA thường hiểu ra ở lần thứ ba. Thử lại nhé."),
      bi("Security is a habit, not a final step.", "Bảo mật là thói quen, không phải bước cuối cùng."),
      bi("Explain it simply, then you really know it.", "Giải thích được thật đơn giản thì mới thật sự hiểu."),
      bi("One proposal can change a year. Send yours.", "Một proposal có thể thay đổi cả năm. Gửi đi thôi."),
      bi("The best time to fix a bug is before mainnet.", "Thời điểm tốt nhất để sửa bug là trước mainnet."),
      bi("When you want to skip, do just 10 minutes. Then decide.", "Khi muốn bỏ, hãy làm 10 phút thôi. Rồi hãy quyết."),
      bi(
        "Five weeks. Your morning self is building your future self.",
        "Năm tuần. Bạn của buổi sáng đang xây bạn của tương lai.",
      ),
      bi("Start the next piece messy. Polish comes later.", "Bắt đầu sản phẩm tiếp theo dù còn lộn xộn. Trau chuốt để sau."),
      bi(
        "Ship small pieces. A working instruction beats a perfect plan.",
        "Ship từng phần nhỏ. Một instruction chạy được hơn bản kế hoạch hoàn hảo.",
      ),
      bi("Write the test that scares you.", "Hãy viết cái test khiến bạn lo nhất."),
      bi("Speak English badly today so you speak it well later.", "Hôm nay nói tiếng Anh còn vụng để sau này nói hay."),
      bi("Stuck is a stage, not a state.", "Bế tắc chỉ là một chặng, không phải mãi mãi."),
      bi("Rejections and reviews are data, not verdicts.", "Từ chối hay góp ý chỉ là dữ liệu, không phải phán quyết."),
      bi("Six weeks of streak-building. Protect it.", "Sáu tuần xây chuỗi. Hãy bảo vệ nó."),
      bi(
        "A passing test on your own program is a milestone. Celebrate briefly, then keep going.",
        "Một test xanh trên program của chính bạn là một cột mốc. Ăn mừng chút rồi đi tiếp.",
      ),
      bi("Your portfolio is your voice when you're not in the room.", "Portfolio là tiếng nói của bạn khi bạn không có mặt."),
      bi("Finish what you started this week.", "Làm cho xong những gì đã bắt đầu tuần này."),
      bi(
        "A README is a gift to the next developer — and to your next client.",
        "README là món quà cho người dev sau, và cho client tiếp theo của bạn.",
      ),
      bi("Demo it to someone today. Explaining reveals the gaps.", "Hôm nay demo cho ai đó xem. Giải thích sẽ lộ ra chỗ hổng."),
    ],
    almost: bi("Tomorrow is the last day of phase 2. Close it cleanly.", "Mai là ngày cuối giai đoạn 2. Khép lại thật gọn gàng."),
    done: bi("Phase 2 complete. The market is talking back now. Listen to it.", "Xong giai đoạn 2. Giờ thị trường đã lên tiếng. Hãy lắng nghe."),
  },
  3: {
    lines: [
      bi("One good review changes everything. Earn it on small work.", "Một review tốt thay đổi tất cả. Hãy kiếm nó từ việc nhỏ."),
      bi("Async is hard for everyone. Draw it on paper.", "Async khó với tất cả mọi người. Hãy vẽ nó ra giấy."),
      bi(
        "Promise a small scope, then deliver more than you promised.",
        "Hứa một scope nhỏ, rồi làm tốt hơn những gì đã hứa.",
      ),
      bi("Read other people's code today. It's free mentorship.", "Hôm nay đọc code của người khác. Đó là được mentor miễn phí."),
      bi("Consistency compounds like interest.", "Sự đều đặn tích luỹ như lãi kép."),
      bi("Keep the pace you had in week one.", "Giữ nhịp như tuần đầu tiên."),
      bi("Eight weeks. Your old self would be proud.", "Tám tuần. Bạn của ngày xưa sẽ tự hào về bạn."),
      bi("Every client message answered fast is a promise kept.", "Mỗi tin nhắn client được trả lời nhanh là một lời hứa được giữ."),
      bi("Correct first, fast later. Chains can't afford wrong.", "Đúng trước, nhanh sau. Chain không được phép sai."),
      bi("When the bug hides, add a test, not a guess.", "Khi bug trốn kỹ, hãy thêm test, đừng đoán mò."),
      bi("Big systems are small pieces that talk to each other.", "Hệ thống lớn chỉ là nhiều mảnh nhỏ nói chuyện với nhau."),
      bi("Strong finishes are built in ordinary mornings.", "Về đích mạnh được xây từ những buổi sáng bình thường."),
      bi("Your next client needs someone exactly like you.", "Client tiếp theo đang cần đúng một người như bạn."),
      bi("Draw the architecture before you code it.", "Vẽ kiến trúc trước khi code."),
      bi("Mainnet feels scary. That's why so few people ship there.", "Mainnet đáng sợ thật. Vì thế mới ít người dám ship."),
      bi("One real user teaches more than ten tutorials.", "Một người dùng thật dạy nhiều hơn mười tutorial."),
      bi(
        "Nobody is born writing good proposals. Improve yours one line at a time.",
        "Không ai sinh ra đã viết proposal hay. Sửa dần từng dòng một.",
      ),
      bi("Every proof starts with a question. Keep asking.", "Mọi bằng chứng đều bắt đầu từ một câu hỏi. Cứ tiếp tục hỏi."),
      bi("Discipline has become who you are. Keep it.", "Kỷ luật đã trở thành con người bạn. Hãy giữ lấy."),
      bi("Sleep is a feature, not a bug. Protect it tonight.", "Ngủ đủ là tính năng, không phải bug. Tối nay hãy giữ nó."),
      bi("Ten weeks of 5 AM. That's who you are now.", "Mười tuần dậy lúc 5 giờ. Đó là con người bạn bây giờ."),
      bi("Core chain reading starts small: one block, one trace.", "Đọc core chain bắt đầu từ việc nhỏ: một block, một lần trace."),
      bi(
        "Reading Reth's code is hard. That's why few can. Be one of them.",
        "Đọc code Reth rất khó. Vì thế ít người làm được. Hãy là một trong số đó.",
      ),
      bi(
        "Run one transaction through revm and you've touched the EVM's heart.",
        "Chạy được một transaction bằng revm là bạn đã chạm vào trái tim EVM.",
      ),
      bi("Read the spec, then the code, then the spec again.", "Đọc spec, rồi đọc code, rồi đọc lại spec."),
      bi("Ask in the community. Builders love good questions.", "Hỏi cộng đồng đi. Người build luôn quý câu hỏi hay."),
      bi("Hard problems are where you earn your rate.", "Bài toán khó là nơi bạn xứng đáng với mức giá của mình."),
      bi("Eleven weeks done. Few people get this far.", "Xong mười một tuần. Rất ít người đi được tới đây."),
      bi("Your case studies are the stories you'll tell on every client call.", "Case study là câu chuyện bạn sẽ kể trong mọi cuộc gọi với client."),
      bi("Open the small PR first. Bigger ones can wait.", "Mở PR nhỏ trước. PR lớn để sau."),
      bi(
        "Write the README as if a client will read it. One will.",
        "Viết README như thể client sẽ đọc. Và họ sẽ đọc thật.",
      ),
      bi("Optional tasks are where you stand out.", "Việc tuỳ chọn chính là nơi bạn nổi bật."),
      bi("Check every number in a case study before you post it.", "Kiểm tra từng con số trong case study trước khi đăng."),
    ],
    almost: bi("One day left in phase 3. Finish your proof strong.", "Còn 1 ngày của giai đoạn 3. Hoàn thiện phần bằng chứng thật chắc."),
    done: bi("Phase 3 complete. You have public proof now. Say that out loud.", "Xong giai đoạn 3. Giờ bạn đã có bằng chứng công khai. Hãy nói to điều đó."),
  },
  4: {
    lines: [
      bi("Turn what you built into words. Every call is practice.", "Biến những gì đã build thành lời nói. Mỗi cuộc gọi đều là luyện tập."),
      bi("Confidence is preparation you can feel.", "Tự tin là sự chuẩn bị mà bạn cảm nhận được."),
      bi("Every mock interview makes the real one easier.", "Mỗi buổi mock giúp buổi phỏng vấn thật dễ hơn."),
      bi("Your accent is fine. Clarity matters more.", "Giọng của bạn ổn mà. Nói rõ ràng mới là điều quan trọng."),
      bi(
        "“I don't know yet, but here's how I'd find out” is a strong answer.",
        "“Tôi chưa biết, nhưng tôi sẽ tìm hiểu thế này” là một câu trả lời mạnh.",
      ),
      bi("Tell your stories with numbers and outcomes.", "Kể câu chuyện của bạn bằng con số và kết quả."),
      bi("Thirteen weeks of mornings. You've earned your confidence.", "Mười ba tuần dậy sớm. Bạn xứng đáng được tự tin."),
      bi("Apply when you feel 70% ready. That's ready.", "Cứ ứng tuyển khi thấy mình sẵn sàng 70%. Thế là đủ rồi."),
      bi("Every rejection is one step closer to a yes.", "Mỗi lời từ chối là một bước gần hơn tới lời đồng ý."),
      bi("You are not the same person who started on day 1.", "Bạn không còn là người đã bắt đầu ở Ngày 1."),
      bi("Negotiate calmly. You know your value now.", "Đàm phán thật bình tĩnh. Giờ bạn biết giá trị của mình."),
      bi("Polish, don't rebuild. You're almost there.", "Trau chuốt, đừng làm lại. Sắp tới đích rồi."),
      bi("One more push. Momentum is on your side.", "Thêm một cú hích nữa. Đà đang đứng về phía bạn."),
      bi("Fourteen weeks. Thank the person who woke up at 5 AM.", "Mười bốn tuần. Hãy cảm ơn người đã dậy lúc 5 giờ sáng."),
      bi("Wrap-up days: tie off every loose end.", "Những ngày tổng kết: buộc lại mọi đầu mối còn dở."),
    ],
    almost: bi("Tomorrow is day 100. Finish like you started: on time.", "Mai là Ngày 100. Về đích như cách bạn bắt đầu: đúng giờ."),
    done: bi(
      "Day 100. You kept your promise to yourself. Now go get the work.",
      "Ngày 100. Bạn đã giữ lời hứa với chính mình. Giờ đi lấy việc thôi.",
    ),
  },
};

/** Lines tied to a day number; they win over the phase line but not over almost / done. */
export const MILESTONE_QUOTES: Record<number, Text> = {
  12: bi("You are not behind. You are on day 12 of 100.", "Bạn không hề chậm. Bạn đang ở Ngày 12 trên 100."),
  30: bi("Day 30. Most people quit before this. You didn't.", "Ngày 30. Đa số bỏ cuộc trước mốc này. Bạn thì không."),
  40: bi("Day 40. You are 40% of the way to a new you.", "Ngày 40. Bạn đã đi được 40% hành trình thành phiên bản mới."),
  50: bi("Day 50: halfway. The second half is where people are made.", "Ngày 50: đã đi nửa chặng. Nửa sau mới là lúc con người được tôi luyện."),
  60: bi("Day 60. Read your day 1 notes and smile.", "Ngày 60. Đọc lại ghi chú Ngày 1 và mỉm cười."),
  70: bi("Day 70. Thirty days left. Make each one count.", "Ngày 70. Còn 30 ngày. Hãy làm mỗi ngày đều đáng giá."),
  80: bi("Day 80. The finish line can see you now.", "Ngày 80. Vạch đích đã nhìn thấy bạn rồi."),
  90: bi("Day 90. Ten days to go. Don't slow down now.", "Ngày 90. Còn 10 ngày. Đừng chậm lại lúc này."),
};

/** `index` is the day's position inside its phase (0-based), `length` the phase's day count. */
export function pickQuote(day: number, phaseId: number, index: number, length: number): Text {
  const phase = PHASE_QUOTES[phaseId];
  if (index === length - 1) return phase.done;
  if (index === length - 2) return phase.almost;
  return MILESTONE_QUOTES[day] ?? phase.lines[index % phase.lines.length];
}
