import { bi, type Text } from "@/lib/text";

export type TrackId = "evm" | "rust" | "security" | "english" | "interview" | "upwork" | "review";

export type Link = { label: Text; url: string };

export type Track = {
  id: TrackId;
  name: Text;
  /** Fits narrow labels such as the roadmap's week rows. */
  short: Text;
  /** The track's role in the strategy. */
  area: Text;
  summary: Text;
};

export type Slot = {
  id: string;
  start: string;
  end: string;
  track: TrackId;
  minutes: number;
};

export type Focus = { title: Text; tasks: Text[]; links?: Link[] };

export type Week = {
  week: number;
  focus: Partial<Record<TrackId, Focus>>;
};

/** Phases span whole plan weeks, so they always break between Sunday and Monday. */
export type Phase = { id: number; title: string; firstWeek: number; lastWeek: number; goal: Text };

export const TOTAL_DAYS = 100;
/**
 * Day 1 is Sunday 01/11/2026, so day 100 is Monday 08/02/2027. The kickoff day, the phase
 * boundaries and the Rust course split are calibrated for this start, so it is fixed.
 */
export const START_DATE = "2026-11-01";

export const TRACKS: Track[] = [
  {
    id: "evm",
    name: "Full-stack EVM",
    short: "EVM",
    area: bi("Sells now · 14h/week", "Bán được ngay · 14h/tuần"),
    summary: bi(
      "Solidity with Foundry, wagmi/viem, Node.js or Go backends, indexers, integrations, RPC and DevOps: what Upwork clients buy most.",
      "Solidity với Foundry, wagmi/viem, backend Node.js hoặc Go, indexer, tích hợp, RPC và DevOps: thứ client Upwork mua nhiều nhất.",
    ),
  },
  {
    id: "rust",
    name: "Rust",
    short: "Rust",
    area: bi("Long-term bet · 12h/week", "Cược dài hạn · 12h/tuần"),
    summary: bi(
      "Learn Rust, ship one Solana program on mainnet, then read core chain code and open small PRs. Pays later, mostly outside Upwork.",
      "Học Rust, ship một Solana program lên mainnet, rồi đọc code core chain và gửi PR nhỏ. Ra tiền chậm hơn, chủ yếu ngoài Upwork.",
    ),
  },
  {
    id: "english",
    name: "English",
    short: "English",
    area: bi("Gate to every channel · 7h/week", "Cửa vào mọi kênh · 7h/tuần"),
    summary: bi(
      "Short spoken answers recorded in one take, requirement and rate talk, thinking aloud, and mock client calls.",
      "Trả lời ngắn, ghi một lần không sửa, trao đổi yêu cầu và giá, nói thành lời khi suy nghĩ, gọi thử với client.",
    ),
  },
  {
    id: "security",
    name: "Security review",
    short: "Security",
    area: bi("Premium skill · 4h/week", "Kỹ năng trả cao · 4h/tuần"),
    summary: bi(
      "Invariant tests, fuzzing, PoCs, and running AI agents then proving which findings are real.",
      "Invariant test, fuzzing, PoC, chạy AI agent rồi chứng minh finding nào là thật.",
    ),
  },
  {
    id: "upwork",
    name: "Upwork",
    short: "Upwork",
    area: bi("Paid work · 4h/week", "Việc có trả tiền · 4h/tuần"),
    summary: bi(
      "Profile, market log, client filters and proposals from week 3, then Arc.dev, direct applications and grants.",
      "Profile, log thị trường, lọc client và proposal từ tuần 3, sau đó Arc.dev, nộp trực tiếp và grant.",
    ),
  },
  {
    id: "interview",
    name: bi("Client interview", "Phỏng vấn client"),
    short: "Interview",
    area: bi("Wins the contract · 3h/week", "Chốt hợp đồng · 3h/tuần"),
    summary: bi(
      "Every Sunday: the questions clients really ask, code walkthroughs and mock calls.",
      "Mỗi Chủ nhật: câu hỏi client hay hỏi, walkthrough code và gọi thử.",
    ),
  },
  {
    id: "review",
    name: bi("Weekly review", "Review tuần"),
    short: "Review",
    area: bi("Discipline · 1h/week", "Kỷ luật · 1h/tuần"),
    summary: bi(
      "Compare planned and actual hours, read your market numbers, and adjust next week.",
      "So giờ kế hoạch với thực tế, đọc số liệu thị trường của bạn, chỉnh tuần sau.",
    ),
  },
];

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "First bids",
    firstWeek: 0,
    lastWeek: 3,
    goal: bi(
      "Upwork profile live, dApp piece shipped, Rust basics done, first 10 proposals out",
      "Profile Upwork hoàn chỉnh, xong dApp đầu tiên, nắm Rust cơ bản, gửi 10 proposal đầu",
    ),
  },
  {
    id: 2,
    title: "First contract",
    firstWeek: 4,
    lastWeek: 7,
    goal: bi(
      "40 targeted proposals, integration and RPC pieces shipped, Solana basics done",
      "40 proposal đúng mục tiêu, xong bộ tích hợp và RPC, nắm Solana cơ bản",
    ),
  },
  {
    id: 3,
    title: "Reviews & proof",
    firstWeek: 8,
    lastWeek: 12,
    goal: bi(
      "Reviews on Upwork, public security review, one Solana program on mainnet, one small core chain PR",
      "Có review trên Upwork, bản security review công khai, một Solana program trên mainnet, một PR core chain nhỏ",
    ),
  },
  {
    id: 4,
    title: "Wider doors",
    firstWeek: 13,
    lastWeek: 15,
    goal: bi(
      "Rust crate published, rates raised, Arc.dev and direct applications running",
      "Publish Rust crate, tăng giá, chạy song song Arc.dev và nộp trực tiếp",
    ),
  },
];

// Mon–Fri 05:00–08:00 and 09:00–11:00 (5h); Sat and Sun 05:00–08:00, 09:00–12:00, 13:00–17:00 (10h).
// 45h per week: EVM 14, Rust 12, English 7, Security 4, Upwork 4, Client interview 3, Review 1.
const morning = (track: TrackId): Slot => ({ id: track, start: "05:00", end: "08:00", track, minutes: 180 });
const english: Slot = { id: "english", start: "09:00", end: "10:00", track: "english", minutes: 60 };
const security: Slot = { id: "security", start: "10:00", end: "11:00", track: "security", minutes: 60 };

/** Study slots by weekday, 0 = Sunday … 6 = Saturday. */
export const SLOTS: Slot[][] = [
  [
    morning("rust"),
    { id: "interview", start: "09:00", end: "12:00", track: "interview", minutes: 180 },
    { id: "english", start: "13:00", end: "15:00", track: "english", minutes: 120 },
    { id: "review", start: "15:00", end: "16:00", track: "review", minutes: 60 },
    { id: "evm", start: "16:00", end: "17:00", track: "evm", minutes: 60 },
  ],
  [morning("evm"), english, security],
  [morning("rust"), english, security],
  [morning("evm"), english, security],
  [morning("rust"), english, security],
  [morning("evm"), english, { id: "upwork", start: "10:00", end: "11:00", track: "upwork", minutes: 60 }],
  [
    morning("evm"),
    { id: "rust", start: "09:00", end: "12:00", track: "rust", minutes: 180 },
    { id: "upwork", start: "13:00", end: "16:00", track: "upwork", minutes: 180 },
    { id: "evm-pm", start: "16:00", end: "17:00", track: "evm", minutes: 60 },
  ],
];

const L = {
  rustCourse: { label: bi("Rust course (85 videos)", "Khoá Rust 85 video"), url: "/rust" },
  rustBook: { label: "The Rust Book", url: "https://doc.rust-lang.org/book/" },
  rustlings: { label: "Rustlings", url: "https://rustlings.rust-lang.org/" },
  exercism: { label: "Exercism Rust", url: "https://exercism.org/tracks/rust" },
  tokio: { label: "Tokio tutorial", url: "https://tokio.rs/tokio/tutorial" },
  clippy: { label: "Clippy", url: "https://doc.rust-lang.org/clippy/" },
  solanaDocs: { label: "Solana docs", url: "https://solana.com/docs" },
  programExamples: { label: "Solana program examples", url: "https://github.com/solana-foundation/program-examples" },
  anchor: { label: "Anchor docs", url: "https://www.anchor-lang.com/docs" },
  reth: { label: "Reth", url: "https://github.com/paradigmxyz/reth" },
  lighthouse: { label: "Lighthouse", url: "https://github.com/sigp/lighthouse" },
  solidityDocs: { label: "Solidity docs", url: "https://docs.soliditylang.org/" },
  foundry: { label: "Foundry", url: "https://getfoundry.sh/" },
  openzeppelin: { label: "OpenZeppelin Contracts", url: "https://docs.openzeppelin.com/contracts" },
  wagmi: { label: "wagmi", url: "https://wagmi.sh/" },
  viem: { label: "viem", url: "https://viem.sh/" },
  nextjs: { label: "Next.js docs", url: "https://nextjs.org/docs" },
  ponder: { label: "Ponder (indexer)", url: "https://ponder.sh/" },
  prometheus: { label: "Prometheus", url: "https://prometheus.io/docs/introduction/overview/" },
  ethernaut: { label: "Ethernaut", url: "https://ethernaut.openzeppelin.com/" },
  dvd: { label: "Damn Vulnerable DeFi", url: "https://www.damnvulnerabledefi.xyz/" },
  solodit: { label: "Solodit audit findings", url: "https://solodit.cyfrin.io/" },
  erc4337: { label: "ERC-4337 docs", url: "https://docs.erc4337.io/" },
  systemDesign: { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
  upwork: { label: "Upwork", url: "https://www.upwork.com/nx/find-work/" },
  uma: {
    label: bi("Upwork recorded video interview", "Video interview trên Upwork"),
    url: "https://support.upwork.com/hc/en-us/articles/41104211856915-How-to-take-a-recorded-video-interview-on-Upwork",
  },
  arc: { label: "Arc.dev", url: "https://arc.dev/talent" },
  toptal: { label: "Toptal", url: "https://www.toptal.com/top-3-percent" },
  superteam: { label: "Superteam Earn", url: "https://superteam.fun/earn/" },
  solanaGrants: { label: "Solana Foundation grants", url: "https://solana.org/grants-funding" },
  matterLabs: { label: "Matter Labs careers", url: "https://jobs.ashbyhq.com/matter-labs" },
} satisfies Record<string, Link>;

const marketLog = bi(
  "Market log, 30 minutes: job counts, then Connects, client spend, rate paid, proposals and video-interview requirement for the top filtered jobs",
  "Log thị trường 30 phút: số job, rồi Connects, spend, rate đã trả, số proposal và yêu cầu video interview của các job đầu qua lọc",
);

// Proven-client jobs are too few to fill the weekly target on their own, so the filter widens on purpose.
const proposals = (count: number, extra: Text[] = []): Focus => ({
  title: bi("Find jobs and send proposals", "Tìm job và gửi proposal"),
  tasks: [
    bi(
      `Send ${count} tailored proposals: proven clients first`,
      `Gửi ${count} proposal viết riêng: ưu tiên client đã chứng minh`,
    ),
    bi(
      "When proven-client jobs run out, accept a new client only with verified payment, a clear spec and no tasks outside Upwork",
      "Khi hết job của client đã chứng minh, chỉ nhận client mới nếu đã xác minh thanh toán, spec rõ và không yêu cầu làm gì ngoài Upwork",
    ),
    marketLog,
    ...extra,
    bi("Log every proposal: reply, interview, hire", "Ghi lại từng proposal: phản hồi, phỏng vấn, được thuê"),
  ],
  links: [L.upwork],
});

const clientWorkFirst = bi(
  "Paid client work comes first and replaces this block; the items below are for weeks without a contract",
  "Việc cho client luôn ưu tiên và thay cho khối này; các việc dưới đây dành cho tuần chưa có hợp đồng",
);

export const WEEKS: Week[] = [
  {
    // Day 1, Sunday 01/11: the kickoff before the first Monday.
    week: 0,
    focus: {
      rust: {
        title: bi("Kickoff: set up + Rust course day 1", "Khởi động: cài đặt + Khoá Rust ngày 1"),
        tasks: [
          bi("Follow Rust course day 1 on the course page", "Học Khoá Rust ngày 1 trên trang khoá học"),
          bi("Create a GitHub repo for your 100-day code and notes", "Tạo repo GitHub cho code và ghi chú 100 ngày"),
        ],
        links: [L.rustCourse, L.rustBook],
      },
      interview: {
        title: bi("Upwork job research & baseline", "Tìm hiểu job Upwork & đánh giá xuất phát điểm"),
        tasks: [
          bi(
            "Read 20 real blockchain jobs on Upwork and note what clients ask for",
            "Đọc 20 job blockchain thật trên Upwork, ghi lại client đang cần gì",
          ),
          bi(
            "Start a market log: search, job count, client spend, rate, proposals",
            "Bắt đầu log thị trường: từ khoá, số job, spend của client, rate, số proposal",
          ),
          bi("Rate yourself 1–5 on each skill clients ask for", "Tự chấm 1–5 cho từng kỹ năng client yêu cầu"),
        ],
        links: [L.upwork],
      },
      english: {
        title: bi("Baseline recording", "Ghi âm xuất phát điểm"),
        tasks: [
          bi(
            "Record a 2-minute “Tell me about yourself” as you are today",
            "Ghi âm 2 phút “Tell me about yourself” với trình độ hiện tại",
          ),
          bi("Write down the words and phrases you got stuck on", "Ghi lại các từ và cụm từ bị vấp"),
          bi("Keep this recording to compare on day 100", "Giữ bản ghi này để so sánh vào Ngày 100"),
        ],
      },
      review: {
        title: bi("Plan the 100 days", "Lên kế hoạch 100 ngày"),
        tasks: [
          bi("Read the roadmap and the goal of each phase", "Đọc lộ trình và mục tiêu từng giai đoạn"),
          bi(
            "Set a 4:45 AM alarm and block the study slots in your calendar",
            "Đặt báo thức 4:45 sáng và chặn các khung giờ học trên lịch",
          ),
          bi("Commit to one rule: never miss two days in a row", "Cam kết một quy tắc: không bỏ 2 ngày liên tiếp"),
        ],
      },
      evm: {
        title: bi("Kickoff: safe dev setup", "Khởi động: môi trường dev an toàn"),
        tasks: [
          bi("Install Foundry (foundryup), run forge init and forge test", "Cài Foundry (foundryup), chạy forge init và forge test"),
          bi(
            "Create a separate browser profile and a test wallet with no real funds",
            "Tạo browser profile riêng và ví test không có tiền thật",
          ),
        ],
        links: [L.foundry],
      },
    },
  },
  {
    week: 1,
    focus: {
      evm: {
        title: bi("Piece A: RWA or stablecoin dApp, contracts", "Sản phẩm A: dApp RWA hoặc stablecoin, phần contract"),
        tasks: [
          bi(
            "Pick a small RWA or stablecoin dApp and write a one-page spec",
            "Chọn một dApp RWA hoặc stablecoin nhỏ, viết spec 1 trang",
          ),
          bi("Write the contracts with Foundry", "Viết contract bằng Foundry"),
          bi("Unit tests for every main flow", "Unit test cho mọi luồng chính"),
          bi("Deploy to a testnet", "Deploy lên testnet"),
        ],
        links: [L.foundry, L.openzeppelin, L.solidityDocs],
      },
      rust: {
        title: bi("Rust for beginners course (85 videos)", "Khoá Rust for beginners (85 video)"),
        tasks: [
          bi("Study one course day in each Rust slot (Rust course page)", "Mỗi slot Rust học một ngày của khoá (trang Khoá Rust)"),
          bi("Do the Rustlings exercises for each topic", "Làm Rustlings theo từng chủ đề"),
          bi("Get the Grep project running", "Project Grep chạy được"),
        ],
        links: [L.rustCourse, L.rustlings],
      },
      english: {
        title: bi("1-minute client introduction", "Giới thiệu với client trong 1 phút"),
        tasks: [
          bi(
            "Write it: who you are, what you ship, one proof",
            "Viết ra: bạn là ai, bạn làm được gì, một bằng chứng",
          ),
          bi("Record it in one take, with no edits, every day", "Mỗi ngày ghi một lần, không sửa"),
          bi("Say it fluently without notes", "Nói trơn tru không cần nhìn"),
        ],
        links: [L.uma],
      },
      security: {
        title: bi("EVM bugs that still pay", "Các lỗi EVM vẫn có giá trị"),
        tasks: [
          bi("Refresh Solidity 0.8.x: storage, custom errors, calldata", "Ôn Solidity 0.8.x: storage, custom error, calldata"),
          bi("Reentrancy and access control: write a failing test for each", "Reentrancy và access control: viết test tái hiện mỗi lỗi"),
        ],
        links: [L.solidityDocs],
      },
      interview: {
        title: bi("How clients screen you", "Client sàng lọc bạn thế nào"),
        tasks: [
          bi("Prepare answers: who you are, what you built, what you charge", "Chuẩn bị câu trả lời: bạn là ai, đã làm gì, giá bao nhiêu"),
          bi("Walk through a reentrancy fix in Foundry, out loud", "Vừa nói vừa walkthrough cách sửa reentrancy trong Foundry"),
          bi(
            "Practise a polite refusal to run an unknown repo; offer screen-share in a VM or your public repo",
            "Tập từ chối lịch sự khi bị yêu cầu chạy repo lạ; đề xuất screen-share trong VM hoặc dùng repo public của bạn",
          ),
        ],
      },
      upwork: {
        title: bi("Fix the CV + set up your profile", "Sửa CV + dựng profile"),
        tasks: [
          bi(
            "Fix the CV from the review: contact info, timeline, typos",
            "Sửa CV theo bản review: thông tin liên hệ, mốc thời gian, lỗi chính tả",
          ),
          bi(
            "Headline as a promise: full-stack EVM and crypto integration, with node operations experience",
            "Headline là một lời hứa: full-stack EVM và crypto integration, có kinh nghiệm vận hành node",
          ),
          bi("Add 3 projects as short client-facing case studies", "Thêm 3 dự án dạng case study ngắn cho client đọc"),
          bi("Set your starting rate: $35–$45/hour", "Đặt giá khởi điểm: $35–$45/giờ"),
          bi(
            "Complete ID verification, which Rising Talent requires",
            "Hoàn tất xác minh danh tính, điều kiện bắt buộc của Rising Talent",
          ),
          bi(
            "Ask a tax professional about VAT and PIT on Upwork income, and the VAT ID banner",
            "Hỏi chuyên gia thuế về VAT, PIT trên thu nhập Upwork và thông báo VAT ID",
          ),
          marketLog,
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 2,
    focus: {
      evm: {
        title: bi("Piece A: front end + invariant tests", "Sản phẩm A: front end + invariant test"),
        tasks: [
          bi("Next.js front end with wagmi/viem", "Front end Next.js với wagmi/viem"),
          bi("Wallet connection with clear error and loading states", "Kết nối ví, xử lý rõ trạng thái lỗi và đang tải"),
          bi("Foundry invariant and fuzz tests", "Invariant và fuzz test bằng Foundry"),
        ],
        links: [L.wagmi, L.viem, L.nextjs, L.foundry],
      },
      rust: {
        title: bi("Finish the course + Rust Book ch.15–16", "Hoàn thành khoá học + Rust Book ch.15–16"),
        tasks: [
          bi("Finish course days 6–7 (Tuesday and Thursday)", "Xong ngày 6–7 của khoá (Thứ Ba và Thứ Năm)"),
          "Rust Book ch.15: Box, Rc, RefCell",
          "Rust Book ch.16: threads, channels, Mutex, Arc",
          bi("Finish the remaining Rustlings", "Làm nốt phần Rustlings còn lại"),
        ],
        links: [L.rustCourse, L.rustBook, L.rustlings],
      },
      english: {
        title: bi("Two project stories in one take", "Hai câu chuyện dự án, ghi một lần"),
        tasks: [
          bi("Tamameme: problem, your role, result", "Tamameme: vấn đề, vai trò của bạn, kết quả"),
          bi("Titan: validators and Go / Rust APIs", "Titan: validator và API Go / Rust"),
          bi("Record each in under 2 minutes, with no edits", "Ghi mỗi câu chuyện dưới 2 phút, không sửa"),
        ],
      },
      security: {
        title: bi("Ethernaut levels 1–10", "Ethernaut level 1–10"),
        tasks: [
          bi("Solve levels 1–10", "Giải level 1–10"),
          bi("Write down each level's vulnerability and fix", "Ghi lỗ hổng và cách sửa của từng level"),
        ],
        links: [L.ethernaut],
      },
      interview: {
        title: bi("Questions on dApp and integration work", "Câu hỏi về dApp và tích hợp"),
        tasks: [
          bi("Explain how a dApp talks to a contract, wallet to indexer", "Giải thích dApp nói chuyện với contract thế nào, từ ví đến indexer"),
          bi("Explain how you test a contract before deployment", "Giải thích cách bạn test contract trước khi deploy"),
          bi("Answer 10 questions out loud, flag the weak ones", "Trả lời to 10 câu, đánh dấu câu còn yếu"),
        ],
      },
      upwork: {
        title: bi("Portfolio, proposal templates, client filter", "Portfolio, mẫu proposal, bộ lọc client"),
        tasks: [
          bi("Write 2 proposal templates: dApp and integration", "Viết 2 mẫu proposal: dApp và tích hợp"),
          bi(
            "Save searches: solidity, web3, dapp, blockchain, rust blockchain, solana",
            "Lưu bộ tìm kiếm: solidity, web3, dapp, blockchain, rust blockchain, solana",
          ),
          bi(
            "Client filter: payment verified, spend ≥ $1K, hires made; divide total spent by hours to see the real rate ceiling",
            "Bộ lọc client: đã xác minh, spend ≥ $1K, đã từng thuê; lấy tổng chi chia số giờ để thấy trần rate thật",
          ),
          bi(
            "Set up a disposable VM with no keys, seeds or .env for any repo received before a contract",
            "Dựng VM dùng một lần, không có key, seed, .env để mở mọi repo nhận trước hợp đồng",
          ),
          bi(
            "Read the real Connects cost on your saved jobs and budget for 40 proposals",
            "Đọc số Connects thật trên các job đã lưu và lập ngân sách cho 40 proposal",
          ),
          marketLog,
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 3,
    focus: {
      evm: {
        title: bi("Finish piece A", "Hoàn thành sản phẩm A"),
        tasks: [
          bi("Node.js indexer for the contract's events", "Indexer Node.js cho event của contract"),
          bi("Deploy everything and record a 2-minute demo", "Deploy toàn bộ và quay demo 2 phút"),
          bi("README with an architecture diagram", "README có sơ đồ kiến trúc"),
          bi("Add piece A to your Upwork portfolio", "Đưa sản phẩm A vào portfolio Upwork"),
        ],
        links: [L.ponder, L.viem],
      },
      rust: {
        title: bi("Practice: a Rust CLI project", "Thực hành: project Rust CLI"),
        tasks: [
          bi("Exercism Rust: 10 exercises", "Exercism Rust: 10 bài"),
          bi("Error handling with thiserror / anyhow", "Error handling với thiserror / anyhow"),
          bi("Tests + cargo clippy + cargo fmt", "Test + cargo clippy + cargo fmt"),
          bi("CLI that reads blocks over RPC, with a README", "CLI đọc block qua RPC, có README"),
        ],
        links: [L.exercism, L.clippy, L.tokio],
      },
      english: {
        title: bi("Upwork video interview practice", "Luyện video interview trên Upwork"),
        tasks: [
          bi(
            "Record 5 answers in one take: Upwork's recorded interview allows no retakes",
            "Ghi 5 câu trả lời một lần: video interview của Upwork không cho làm lại",
          ),
          bi("Speak while you think; avoid long silences", "Nói thành lời khi đang nghĩ, tránh im lặng lâu"),
          bi("Listen back and fix one habit", "Nghe lại và sửa một thói quen"),
        ],
        links: [L.uma],
      },
      security: {
        title: bi("Ethernaut levels 11–20", "Ethernaut level 11–20"),
        tasks: [
          bi("Solve levels 11–20", "Giải level 11–20"),
          bi("Write down each vulnerability and fix", "Ghi lỗ hổng và cách sửa"),
        ],
        links: [L.ethernaut],
      },
      interview: {
        title: bi("Phase 1 review + first mock call", "Ôn giai đoạn 1 + gọi thử lần đầu"),
        tasks: [
          bi("30-minute mock client call (a friend or AI)", "Gọi thử 30 phút với client (bạn bè hoặc AI)"),
          bi("Rust self-check: ownership, traits, lifetimes", "Tự kiểm tra Rust: ownership, traits, lifetimes"),
          bi("Note weak answers and practise them", "Ghi câu trả lời yếu và luyện lại"),
        ],
      },
      upwork: proposals(10, [
        bi("Bid $35–$45/hour, small scope with milestones", "Bid $35–$45/giờ, scope nhỏ có milestone"),
        bi(
          "Client calls override study slots: US evening is about 7–10 AM in Vietnam",
          "Cuộc gọi với client được ưu tiên hơn giờ học: tối ở Mỹ là khoảng 7–10 giờ sáng Việt Nam",
        ),
      ]),
    },
  },
  {
    week: 4,
    focus: {
      evm: {
        title: bi("Piece B: exchange integration service", "Sản phẩm B: service tích hợp sàn giao dịch"),
        tasks: [
          bi("Node.js or Go service against one exchange API", "Service Node.js hoặc Go với API của một sàn"),
          bi("Retries, rate limits and idempotency", "Retry, rate limit và idempotency"),
          bi("Reconciliation job and alerts", "Job đối soát và cảnh báo"),
        ],
      },
      rust: {
        title: "Solana fundamentals",
        tasks: [
          bi("Account model, rent, account owners", "Account model, rent, owner của account"),
          bi("Transactions, instructions, signers", "Transaction, instruction, signer"),
          bi("Native Rust program (no Anchor): counter", "Program Rust thuần (không Anchor): counter"),
          bi("Run a local validator and call it from a client", "Chạy local validator và gọi từ client"),
        ],
        links: [L.solanaDocs, L.programExamples],
      },
      english: {
        title: bi("Clarifying requirements", "Làm rõ yêu cầu"),
        tasks: [
          bi("Prepare 10 questions on scope, timeline and budget", "Chuẩn bị 10 câu hỏi về scope, timeline, ngân sách"),
          bi("Role-play a discovery call and record it", "Đóng vai cuộc gọi tìm hiểu yêu cầu và ghi lại"),
        ],
      },
      security: {
        title: bi("Finding bugs with fuzz and invariant tests", "Tìm lỗi bằng fuzz và invariant test"),
        tasks: [
          bi("Fuzz tests that reproduce a known bug", "Fuzz test tái hiện một lỗi đã biết"),
          bi("Invariant tests with a handler", "Invariant test với handler"),
        ],
        links: [L.foundry],
      },
      interview: {
        title: bi("Explain Solana to a client", "Giải thích Solana cho client"),
        tasks: [
          "Account model vs EVM storage",
          bi("When Solana fits a client better than EVM, and when it does not", "Khi nào Solana hợp với client hơn EVM và khi nào không"),
        ],
        links: [L.solanaDocs],
      },
      upwork: proposals(8, [
        bi(
          "Email the Superteam Vietnam chapter to ask whether its grant is still open",
          "Email Superteam Vietnam hỏi grant còn nhận đơn không",
        ),
      ]),
      review: {
        title: bi("Weekly review + decision on Rust weight", "Review tuần + quyết định tỷ trọng Rust"),
        tasks: [
          bi("Compare total hours with the plan", "So tổng giờ học với kế hoạch"),
          bi(
            "Decide: if filtered solana + rust blockchain jobs reach a third of filtered solidity jobs and pay $20+/hour more, move time from EVM to Rust",
            "Quyết định: nếu job solana + rust blockchain qua lọc đạt 1/3 job solidity qua lọc và trả cao hơn từ $20/giờ, chuyển bớt giờ từ EVM sang Rust",
          ),
          bi("Pick next week's top 3 priorities", "Chọn 3 ưu tiên cho tuần sau"),
        ],
      },
    },
  },
  {
    week: 5,
    focus: {
      evm: {
        title: bi("Finish piece B: stablecoin payment flow", "Hoàn thành sản phẩm B: luồng thanh toán stablecoin"),
        tasks: [
          bi("Stablecoin payment flow with status tracking", "Luồng thanh toán stablecoin có theo dõi trạng thái"),
          bi("Tests and failure handling", "Test và xử lý lỗi"),
          bi("README and client-facing case study", "README và case study cho client đọc"),
          bi("Add piece B to your Upwork portfolio", "Đưa sản phẩm B vào portfolio Upwork"),
        ],
      },
      rust: {
        title: "PDA, CPI, SPL Token",
        tasks: [
          "PDA: seeds, bump",
          bi("CPI: call the System Program and Token Program", "CPI: gọi System Program, Token Program"),
          "SPL Token / Token-2022: mint, transfer",
          bi("Do 3 exercises from program-examples", "Làm 3 bài trong program-examples"),
        ],
        links: [L.solanaDocs, L.programExamples],
      },
      english: {
        title: bi("Think aloud while coding", "Vừa code vừa nói"),
        tasks: [
          bi("Solve a small task while narrating in English", "Giải một bài nhỏ, vừa làm vừa nói tiếng Anh"),
          bi("Collect 20 phrases you use while coding", "Ghi 20 cụm từ hay dùng khi code"),
        ],
      },
      security: {
        title: bi("Run an AI agent, then verify it", "Chạy AI agent rồi kiểm chứng"),
        tasks: [
          bi("Run an agent on a known-vulnerable repo", "Chạy agent trên một repo có lỗi đã biết"),
          bi("Prove every finding with a Foundry PoC", "Chứng minh mọi finding bằng PoC Foundry"),
          bi("Log false positives and missed bugs", "Ghi lại báo sai và lỗi bị bỏ sót"),
        ],
        links: [L.foundry],
      },
      interview: {
        title: bi("Solana questions clients ask", "Câu hỏi Solana client hay hỏi"),
        tasks: [
          bi("Explain PDAs and CPI in plain English", "Giải thích PDA và CPI bằng tiếng Anh đơn giản"),
          bi("Compare SPL Token with ERC-20", "So sánh SPL Token với ERC-20"),
          bi("Answer 10 questions out loud, flag the weak ones", "Trả lời to 10 câu, đánh dấu câu còn yếu"),
        ],
        links: [L.solanaDocs],
      },
      upwork: proposals(8),
    },
  },
  {
    week: 6,
    focus: {
      evm: {
        title: bi("Piece C: RPC node deployment kit", "Sản phẩm C: bộ deploy RPC node"),
        tasks: [
          bi("Deploy an RPC node on cloud with infrastructure as code", "Deploy RPC node trên cloud bằng infrastructure as code"),
          bi("Monitoring and alerts", "Monitoring và cảnh báo"),
          bi("Measure sync health and latency", "Đo tình trạng sync và độ trễ"),
        ],
        links: [L.prometheus],
      },
      rust: {
        title: bi("Anchor + design piece E", "Anchor + thiết kế sản phẩm E"),
        tasks: [
          "Anchor: account constraints, errors, events",
          bi("Anchor tests in TypeScript", "Test Anchor bằng TypeScript"),
          bi(
            "Design piece E: a useful program such as USDC invoices or escrow, not a memecoin tool",
            "Thiết kế sản phẩm E: một program hữu ích như hoá đơn USDC hoặc escrow, không làm tool memecoin",
          ),
          bi("Code the core instructions", "Code các instruction chính"),
        ],
        links: [L.anchor],
      },
      english: {
        title: bi("Talking about scope and rates", "Trao đổi về scope và giá"),
        tasks: [
          bi("Practise quoting a rate without apologising", "Tập báo giá tự tin, không xin lỗi"),
          bi("Practise saying no to scope creep", "Tập từ chối phần việc phát sinh"),
        ],
      },
      security: {
        title: "Damn Vulnerable DeFi 1–5",
        tasks: [
          bi("Solve challenges 1–5", "Giải challenge 1–5"),
          bi("Write down the attack techniques", "Ghi lại kỹ thuật tấn công"),
        ],
        links: [L.dvd],
      },
      interview: {
        title: bi("System design: indexer and integrations", "System design: indexer và tích hợp"),
        tasks: [
          bi("Design an indexer that survives chain reorgs", "Thiết kế indexer chịu được chain reorg"),
          bi("Design idempotent payment processing", "Thiết kế xử lý thanh toán idempotent"),
        ],
        links: [L.systemDesign],
      },
      upwork: proposals(7),
    },
  },
  {
    week: 7,
    focus: {
      evm: {
        title: bi("Finish piece C", "Hoàn thành sản phẩm C"),
        tasks: [
          bi("Failover between RPC nodes", "Failover giữa các RPC node"),
          bi("Runbook for common incidents", "Runbook cho các sự cố thường gặp"),
          bi("Case study: turn validator experience into something clients buy", "Case study: biến kinh nghiệm validator thành thứ client mua"),
          bi("Add piece C to your Upwork portfolio", "Đưa sản phẩm C vào portfolio Upwork"),
        ],
        links: [L.prometheus],
      },
      rust: {
        title: bi("Piece E: program + tests", "Sản phẩm E: program + test"),
        tasks: [
          bi("Finish all instructions", "Hoàn thành mọi instruction"),
          bi("Tests for success and failure paths", "Test cả luồng thành công và thất bại"),
          bi("Handle edge cases: rent, closing accounts, authority", "Xử lý edge case: rent, đóng account, authority"),
        ],
        links: [L.anchor],
      },
      english: {
        title: bi("Demo walkthrough", "Thuyết trình demo"),
        tasks: [
          bi("A 5-minute English walkthrough of pieces A and B", "Thuyết trình 5 phút bằng tiếng Anh về sản phẩm A và B"),
          bi("Record it and fix what sounds unclear", "Ghi lại và sửa chỗ chưa rõ"),
        ],
      },
      security: {
        title: bi("Proxies and upgrade safety", "Proxy và an toàn khi upgrade"),
        tasks: [
          "UUPS vs Transparent proxy, storage collision",
          bi("Write an upgradeable contract and test the upgrade", "Viết contract upgradeable và test upgrade"),
        ],
        links: [L.openzeppelin],
      },
      interview: {
        title: bi("Mock client call: your portfolio", "Gọi thử với client: portfolio của bạn"),
        tasks: [
          bi("45-minute mock: explain a piece and answer questions", "Gọi thử 45 phút: giải thích một sản phẩm và trả lời câu hỏi"),
          bi("Note weak answers and practise them", "Ghi câu trả lời yếu và luyện lại"),
        ],
      },
      upwork: proposals(7, [bi("Total so far should reach about 40 proposals", "Tổng tới giờ đạt khoảng 40 proposal")]),
      review: {
        title: bi("Weekly review + decision on proposals", "Review tuần + quyết định về proposal"),
        tasks: [
          bi("Compare total hours with the plan", "So tổng giờ học với kế hoạch"),
          bi(
            "Decide: under 2 replies after 40 targeted proposals means stop adding tech and fix profile, proposals and English first",
            "Quyết định: dưới 2 phản hồi sau 40 proposal đúng mục tiêu thì dừng học thêm công nghệ, sửa profile, proposal và tiếng Anh trước",
          ),
          bi("Pick next week's top 3 priorities", "Chọn 3 ưu tiên cho tuần sau"),
        ],
      },
    },
  },
  {
    week: 8,
    focus: {
      evm: {
        title: bi("Client work, or make piece A mainnet-ready", "Việc cho client, hoặc đưa sản phẩm A lên mức mainnet"),
        tasks: [
          clientWorkFirst,
          bi("Fix everything found by your own security review", "Sửa mọi lỗi do chính bạn review ra"),
          bi("Gas report and optimisation", "Báo cáo và tối ưu gas"),
        ],
      },
      rust: {
        title: bi("Piece E: TypeScript client + indexer", "Sản phẩm E: client TypeScript + indexer"),
        tasks: [
          bi("TypeScript client for every instruction", "Client TypeScript cho mọi instruction"),
          bi("Small web page people can actually use", "Trang web nhỏ mà người dùng thật dùng được"),
          bi("Indexer for program events", "Indexer cho event của program"),
        ],
        links: [L.anchor, L.solanaDocs],
      },
      english: {
        title: bi("Weekly mock client calls", "Gọi thử với client mỗi tuần"),
        tasks: [
          bi("One mock call with a friend or AI", "Một buổi gọi thử với bạn bè hoặc AI"),
          bi("Note weak spots and practise them", "Ghi điểm yếu, luyện lại"),
        ],
      },
      security: {
        title: bi("Piece D: pick a target and review it", "Sản phẩm D: chọn mục tiêu và review"),
        tasks: [
          bi("Pick an open-source contract set with no live audit contest", "Chọn một bộ contract mã nguồn mở, không nằm trong audit contest"),
          bi("Run an agent and review by hand", "Chạy agent và tự review"),
          bi("List candidate findings", "Liệt kê các finding nghi ngờ"),
        ],
        links: [L.solodit],
      },
      interview: {
        title: bi("Rust screening questions", "Câu hỏi sàng lọc Rust"),
        tasks: [
          bi("Ownership, borrowing and lifetimes in plain English", "Ownership, borrowing, lifetimes bằng tiếng Anh đơn giản"),
          bi("Send, Sync and Arc<Mutex<T>>", "Send, Sync và Arc<Mutex<T>>"),
          bi("Result, the ? operator, custom errors", "Result, toán tử ?, custom error"),
          bi("Show a Clippy-clean code sample with rustdoc", "Chuẩn bị code mẫu sạch Clippy, có rustdoc"),
        ],
        links: [L.clippy],
      },
      upwork: proposals(5, [
        bi("After 2–3 reviews raise your rate to $50–$60/hour", "Sau 2–3 review, tăng giá lên $50–$60/giờ"),
      ]),
    },
  },
  {
    week: 9,
    focus: {
      evm: {
        title: bi("Client work, or production hardening", "Việc cho client, hoặc củng cố production"),
        tasks: [
          clientWorkFirst,
          bi("CI for tests and deployments on pieces A and B", "CI cho test và deploy của sản phẩm A, B"),
          bi("Structured logs and error tracking", "Log có cấu trúc và theo dõi lỗi"),
        ],
      },
      rust: {
        title: bi("Piece E: security checks + devnet", "Sản phẩm E: kiểm tra bảo mật + devnet"),
        tasks: [
          bi("Check signers, owners and PDA seeds", "Kiểm tra signer, owner và PDA seed"),
          bi("Deploy to devnet and test with real wallets", "Deploy devnet và test với ví thật"),
          bi("Invite 3 people to try it", "Mời 3 người dùng thử"),
        ],
        links: [L.solanaDocs],
      },
      english: {
        title: bi("Weekly mock client calls", "Gọi thử với client mỗi tuần"),
        tasks: [
          bi("One mock call with a friend or AI", "Một buổi gọi thử với bạn bè hoặc AI"),
          bi("Explain reentrancy to a non-technical client", "Giải thích reentrancy cho client không biết kỹ thuật"),
        ],
      },
      security: {
        title: bi("Finish piece D: public review", "Hoàn thành sản phẩm D: bản review công khai"),
        tasks: [
          bi("Write a Foundry PoC for each real finding", "Viết PoC Foundry cho mỗi finding thật"),
          bi("Write up where the agent was wrong", "Ghi rõ agent đã sai ở đâu"),
          bi("Publish the report and add it to your portfolio", "Công bố báo cáo và đưa vào portfolio"),
        ],
        links: [L.foundry, L.solodit],
      },
      interview: {
        title: bi("Questions on payments and stablecoins", "Câu hỏi về thanh toán và stablecoin"),
        tasks: [
          bi("Explain a stablecoin payment flow end to end", "Giải thích luồng thanh toán stablecoin từ đầu đến cuối"),
          bi("Explain reconciliation and failure recovery", "Giải thích đối soát và khôi phục khi lỗi"),
        ],
      },
      upwork: {
        title: bi("Apply to Arc.dev + keep bidding", "Nộp Arc.dev + tiếp tục bid"),
        tasks: [
          bi("Apply to Arc.dev with your CV and portfolio", "Nộp Arc.dev với CV và portfolio"),
          bi("Send 5 tailored proposals", "Gửi 5 proposal viết riêng"),
          marketLog,
        ],
        links: [L.arc, L.upwork],
      },
    },
  },
  {
    week: 10,
    focus: {
      evm: {
        title: bi("Client work, or wallet UX upgrade", "Việc cho client, hoặc nâng cấp trải nghiệm ví"),
        tasks: [
          clientWorkFirst,
          "Account abstraction: UserOperation, EntryPoint, bundler",
          bi("Add a smoother wallet flow to piece A", "Thêm luồng ví mượt hơn cho sản phẩm A"),
        ],
        links: [L.erc4337],
      },
      rust: {
        title: bi("Piece E: mainnet + first real users", "Sản phẩm E: mainnet + người dùng thật đầu tiên"),
        tasks: [
          bi("Deploy to mainnet", "Deploy lên mainnet"),
          bi("Get first real users", "Có người dùng thật đầu tiên"),
          bi("README, demo video and Upwork case study", "README, video demo và case study trên Upwork"),
        ],
        links: [L.solanaDocs, L.anchor],
      },
      english: {
        title: bi("Explain Solana in plain English", "Giải thích Solana bằng tiếng Anh đơn giản"),
        tasks: [
          bi("Explain PDAs to a non-technical client", "Giải thích PDA cho client không biết kỹ thuật"),
          bi("One mock call with a friend or AI", "Một buổi gọi thử với bạn bè hoặc AI"),
        ],
      },
      security: {
        title: bi("Solana security checklist on piece E", "Checklist bảo mật Solana cho sản phẩm E"),
        tasks: [
          bi("Missing signer and owner checks", "Thiếu kiểm tra signer và owner"),
          "Account confusion, PDA collision, arithmetic overflow",
        ],
        links: [L.anchor],
      },
      interview: {
        title: bi("Solana: Anchor and security questions", "Solana: câu hỏi về Anchor và bảo mật"),
        tasks: [
          bi("Explain piece E in 10 minutes", "Giải thích sản phẩm E trong 10 phút"),
          bi("Answer Solana security questions", "Trả lời câu hỏi bảo mật Solana"),
        ],
      },
      upwork: {
        title: bi("Direct applications + grants", "Nộp trực tiếp + grant"),
        tasks: [
          bi("List companies hiring globally and apply to 3 with Go or Solidity", "Liệt kê công ty tuyển toàn cầu, nộp 3 nơi với Go hoặc Solidity"),
          bi("Apply for a Solana grant if piece E has real users", "Xin grant Solana nếu sản phẩm E đã có người dùng thật"),
          bi("Send 5 tailored proposals", "Gửi 5 proposal viết riêng"),
          marketLog,
        ],
        links: [L.matterLabs, L.solanaGrants, L.superteam],
      },
    },
  },
  {
    week: 11,
    focus: {
      evm: {
        title: bi("Client work, or a stablecoin feature", "Việc cho client, hoặc thêm tính năng stablecoin"),
        tasks: [
          clientWorkFirst,
          bi("Add one stablecoin or RWA feature clients keep asking for", "Thêm một tính năng stablecoin hoặc RWA mà client hay hỏi"),
        ],
      },
      rust: {
        title: bi("Core chain: read the code", "Core chain: đọc code"),
        tasks: [
          bi("Pick Lighthouse (PoS) or Reth (EVM)", "Chọn Lighthouse (PoS) hoặc Reth (EVM)"),
          bi("Read the architecture: sync, execution, consensus", "Đọc kiến trúc: sync, execution, consensus"),
          bi("Run a local node and trace one block", "Chạy node local và theo dõi một block"),
        ],
        links: [L.lighthouse, L.reth],
      },
      english: {
        title: bi("Explain while drawing diagrams", "Vừa vẽ sơ đồ vừa giải thích"),
        tasks: [
          bi("Draw piece B's architecture and explain it for 5 minutes", "Vẽ kiến trúc sản phẩm B và giải thích 5 phút"),
          bi("One mock call with a friend or AI", "Một buổi gọi thử với bạn bè hoặc AI"),
        ],
      },
      security: {
        title: bi("Read real audit findings", "Đọc finding audit thật"),
        tasks: [
          bi("Read 10 high-severity findings on Solodit", "Đọc 10 finding mức cao trên Solodit"),
          bi("Summarise the 5 most common patterns", "Tóm tắt 5 pattern hay gặp nhất"),
        ],
        links: [L.solodit],
      },
      interview: {
        title: bi("System design for blockchain", "System design cho blockchain"),
        tasks: [
          bi("Design an L1 ↔ L2 bridge at a high level", "Thiết kế tổng quan bridge L1 ↔ L2"),
          bi("Design validator / RPC infrastructure", "Thiết kế hạ tầng validator / RPC"),
        ],
        links: [L.systemDesign],
      },
      upwork: proposals(5),
    },
  },
  {
    week: 12,
    focus: {
      evm: {
        title: bi("Client case studies", "Case study cho client"),
        tasks: [
          clientWorkFirst,
          bi("Rewrite pieces A, B and C as outcome-first case studies", "Viết lại sản phẩm A, B, C theo hướng nêu kết quả trước"),
          bi("Update your Upwork portfolio and overview", "Cập nhật portfolio và overview trên Upwork"),
        ],
      },
      rust: {
        title: bi("Core chain: one small PR", "Core chain: một PR nhỏ"),
        tasks: [
          bi("Pick a good-first issue", "Chọn một good-first issue"),
          bi("Write the fix and tests", "Viết bản sửa và test"),
          bi("Open the PR and answer review comments", "Mở PR và trả lời review"),
        ],
        links: [L.lighthouse, L.reth],
      },
      english: {
        title: bi("Mock calls with a real person", "Gọi thử với người thật"),
        tasks: [
          bi("One call with a real English speaker", "Một buổi gọi với người nói tiếng Anh thật"),
          bi("Compare against your week 3 recordings", "So sánh với bản ghi tuần 3"),
        ],
      },
      security: {
        title: bi("Client-ready review checklist", "Checklist review dùng cho client"),
        tasks: [
          bi("Write your own review checklist", "Tự viết checklist review của bạn"),
          bi("Offer a small review as a service on Upwork", "Thêm gói review nhỏ trên Upwork"),
        ],
      },
      interview: {
        title: bi("Full mock client call", "Gọi thử trọn vẹn với client"),
        tasks: [
          bi("One-minute intro, two stories, one code walkthrough", "Giới thiệu 1 phút, 2 câu chuyện, 1 walkthrough code"),
          bi("Handle a rate objection", "Xử lý khi client chê giá"),
        ],
      },
      upwork: {
        title: bi("Toptal check + keep bidding", "Cân nhắc Toptal + tiếp tục bid"),
        tasks: [
          bi("Apply to Toptal only if your English mocks now go well", "Chỉ nộp Toptal khi đã tự tin qua các buổi gọi thử"),
          bi("Send 5 tailored proposals", "Gửi 5 proposal viết riêng"),
          marketLog,
        ],
        links: [L.toptal, L.upwork],
      },
    },
  },
  {
    week: 13,
    focus: {
      evm: {
        title: bi("Client work, or a reusable starter kit", "Việc cho client, hoặc starter kit dùng lại được"),
        tasks: [
          clientWorkFirst,
          bi("Turn your best code into a starter kit for new client projects", "Biến code tốt nhất thành starter kit cho dự án mới"),
        ],
      },
      rust: {
        title: bi("Piece F: Rust crate for node operators", "Sản phẩm F: Rust crate cho người vận hành node"),
        tasks: [
          bi("Build a validator or RPC metrics tool", "Viết tool đo validator hoặc RPC"),
          bi("Clean under Clippy", "Sạch cảnh báo Clippy"),
          bi("Full rustdoc and tests", "Đủ rustdoc và test"),
        ],
        links: [L.clippy, L.tokio],
      },
      english: {
        title: bi("Mock calls with a real person", "Gọi thử với người thật"),
        tasks: [
          bi("One call with a real English speaker", "Một buổi gọi với người nói tiếng Anh thật"),
          bi("Note weak spots and practise them", "Ghi điểm yếu, luyện lại"),
        ],
      },
      security: {
        title: bi("Review one real change", "Review một thay đổi thật"),
        tasks: [
          bi("Review a real client change or an open-source PR", "Review một thay đổi của client hoặc PR mã nguồn mở"),
          bi("Write it up in client-ready form", "Viết lại theo dạng gửi được cho client"),
        ],
      },
      interview: {
        title: bi("Rust and Solidity question sets", "Bộ câu hỏi Rust và Solidity"),
        tasks: [
          bi("30 Solidity and EVM questions, answered out loud", "Trả lời to 30 câu Solidity và EVM"),
          bi("20 Rust questions, answered out loud", "Trả lời to 20 câu Rust"),
        ],
      },
      upwork: {
        title: bi("Long-term clients", "Client dài hạn"),
        tasks: [
          bi("Offer existing clients ongoing work", "Đề xuất làm tiếp lâu dài với client hiện có"),
          bi("Keep work on Upwork: off-platform moves need the conversion fee", "Giữ việc trên Upwork: chuyển ra ngoài phải trả conversion fee"),
          bi("Send 5 tailored proposals", "Gửi 5 proposal viết riêng"),
          marketLog,
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 14,
    focus: {
      evm: {
        title: bi("Portfolio polish", "Hoàn thiện portfolio"),
        tasks: [
          clientWorkFirst,
          bi("Check that every demo and repo still works", "Kiểm tra mọi demo và repo vẫn chạy"),
          bi("Add client reviews and numbers to each case study", "Thêm review và số liệu vào từng case study"),
        ],
      },
      rust: {
        title: bi("Finish piece F", "Hoàn thành sản phẩm F"),
        tasks: [
          bi("Publish the crate with a README and example", "Publish crate kèm README và ví dụ"),
          bi("Add it to your portfolio and CV", "Đưa vào portfolio và CV"),
          bi("Apply to 5 Rust or Go roles that hire globally", "Nộp 5 vị trí Rust hoặc Go tuyển toàn cầu"),
        ],
        links: [L.clippy, L.matterLabs],
      },
      english: {
        title: bi("Compare with day 1", "So sánh với Ngày 1"),
        tasks: [
          bi("Record the same 2-minute introduction again", "Ghi lại đúng bài giới thiệu 2 phút"),
          bi("Compare it with your day 1 recording", "So sánh với bản ghi Ngày 1"),
        ],
      },
      security: {
        title: bi("Polish the public review", "Hoàn thiện bản review công khai"),
        tasks: [
          bi("Update piece D with what you learned", "Cập nhật sản phẩm D với những gì đã học"),
          bi("Add your review service to your profile", "Thêm dịch vụ review vào profile"),
        ],
      },
      interview: {
        title: bi("Final mock", "Mock cuối"),
        tasks: [
          bi("Full mock: technical plus client conversation", "Mock đầy đủ: kỹ thuật và trao đổi với client"),
          bi("Lock in your model answers", "Chốt bộ câu trả lời mẫu"),
        ],
      },
      upwork: {
        title: bi("Re-price and read your numbers", "Đặt lại giá và đọc số liệu"),
        tasks: [
          bi("Review your 12 weeks of proposal and client data", "Xem lại dữ liệu proposal và client của 12 tuần"),
          bi("Set your next rate from the data", "Đặt mức giá tiếp theo dựa trên dữ liệu"),
          bi("Send 5 tailored proposals", "Gửi 5 proposal viết riêng"),
        ],
        links: [L.upwork],
      },
      review: {
        title: bi("Review the channels for 2027", "Review các kênh cho 2027"),
        tasks: [
          bi("Compare total hours with the plan", "So tổng giờ học với kế hoạch"),
          bi(
            "If there is no Upwork contract 5 months after the first bid, shift priority to Arc.dev and direct applications",
            "Nếu 5 tháng sau lần bid đầu vẫn chưa có hợp đồng Upwork, chuyển ưu tiên sang Arc.dev và nộp trực tiếp",
          ),
          bi(
            "Set the Solana stop-loss: if there is no paid contract, grant or offer by 30/06/2027, drop Solana to maintenance",
            "Đặt stop-loss Solana: đến 30/06/2027 chưa có hợp đồng, grant hay offer trả tiền thì hạ Solana xuống mức duy trì",
          ),
        ],
      },
    },
  },
  {
    week: 15,
    focus: {
      evm: {
        title: bi("100-day wrap-up", "Tổng kết 100 ngày"),
        tasks: [
          bi("Finalize the CV", "Chốt CV bản cuối"),
          bi("Check all 6 portfolio pieces", "Kiểm tra cả 6 sản phẩm portfolio"),
          bi("Write a 100-day retrospective", "Viết bài tổng kết 100 ngày"),
        ],
      },
      security: {
        title: bi("Security wrap-up", "Tổng kết security"),
        tasks: [bi("List what you can now sell as a review service", "Liệt kê những gì đã bán được dưới dạng dịch vụ review")],
      },
      english: {
        title: bi("English wrap-up", "Tổng kết English"),
        tasks: [bi("Set your English goal for the next 100 days", "Đặt mục tiêu tiếng Anh cho 100 ngày tiếp theo")],
      },
    },
  },
];

/** Sunday 15:00–16:00 of every week without its own review focus. */
export const REVIEW_FOCUS: Focus = {
  title: bi("Weekly review", "Review tuần"),
  tasks: [
    bi("Compare total hours with the plan", "So tổng giờ học với kế hoạch"),
    bi("Read your proposal and market numbers", "Đọc số liệu proposal và thị trường của bạn"),
    bi("Carry unfinished work to next week", "Dời việc chưa xong sang tuần sau"),
    bi("Pick next week's top 3 priorities", "Chọn 3 ưu tiên cho tuần sau"),
  ],
};
