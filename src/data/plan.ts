import { bi, type Text } from "@/lib/text";

export type TrackId = "rust" | "solidity" | "english" | "interview" | "upwork" | "review";

export type Link = { label: Text; url: string };

export type Track = {
  id: TrackId;
  name: Text;
  /** Fits narrow labels such as the roadmap's week rows. */
  short: Text;
  /** Where the track sits in the original goal list. */
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
 * Day 1 is Sunday 25/10/2026, so day 100 is Monday 01/02/2027. The kickoff day, the phase
 * boundaries and the Rust course split are calibrated for this start, so it is fixed.
 */
export const START_DATE = "2026-10-25";

export const TRACKS: Track[] = [
  {
    id: "rust",
    name: "Rust",
    short: "Rust",
    area: "I. NewJob",
    summary: "Learn Rust → Rust for Solana → Rust for core chain (Layer 2).",
  },
  {
    id: "solidity",
    name: "Solidity",
    short: "Solidity",
    area: "II. Solidity",
    summary: bi(
      "Refresh the overview, upgrade your knowledge (Foundry, security, DeFi), then practice interviews.",
      "Ôn tổng quan, nâng cấp kiến thức (Foundry, bảo mật, DeFi) rồi luyện interview.",
    ),
  },
  {
    id: "english",
    name: "English",
    short: "English",
    area: "III. English",
    summary: bi(
      "English for interviews: self-introduction, project stories, STAR, mock interviews.",
      "Luyện tiếng Anh cho phỏng vấn: giới thiệu bản thân, kể dự án, STAR, mock interview.",
    ),
  },
  {
    id: "interview",
    name: bi("Technical interview", "Interview kỹ thuật"),
    short: "Interview",
    area: "I.4 + II.3",
    summary: bi(
      "Rust, Solana, Solidity and system design questions plus a mock interview every Sunday.",
      "Bộ câu hỏi Rust, Solana, Solidity, system design và mock interview mỗi Chủ nhật.",
    ),
  },
  {
    id: "upwork",
    name: "Upwork",
    short: "Upwork",
    area: "Upwork",
    summary: bi(
      "Profile, finding jobs, sending proposals and client interviews.",
      "Profile, tìm job, gửi proposal và phỏng vấn với client.",
    ),
  },
  {
    id: "review",
    name: bi("Weekly review", "Review tuần"),
    short: "Review",
    area: bi("Discipline", "Kỷ luật"),
    summary: bi(
      "Compare planned and actual hours, carry over unfinished work, adjust next week.",
      "So giờ kế hoạch với thực tế, dời việc chưa xong, chỉnh kế hoạch tuần sau.",
    ),
  },
];

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Learn Rust",
    firstWeek: 0,
    lastWeek: 3,
    goal: bi("85 videos, 100% Rustlings, 1 Rust CLI repo", "Xong 85 video, 100% Rustlings, 1 repo Rust CLI"),
  },
  {
    id: 2,
    title: "Rust for Solana",
    firstWeek: 4,
    lastWeek: 7,
    goal: bi(
      "Project 1: escrow/marketplace program on devnet with tests and a TS client",
      "Project 1: program escrow/marketplace trên devnet, có test và client TS",
    ),
  },
  {
    id: 3,
    title: "Rust for core chain (Layer 2)",
    firstWeek: 8,
    lastWeek: 12,
    goal: bi("Project 2: a mini-chain + mini rollup in Rust", "Project 2: mini-chain + mini rollup bằng Rust"),
  },
  {
    id: 4,
    title: "Interview & job",
    firstWeek: 13,
    lastWeek: 15,
    goal: bi("≥ 10 mock interviews, final CV and portfolio", "≥ 10 mock interview, CV và portfolio bản cuối"),
  },
];

// Mon–Fri 4:00–8:00; Sat and Sun 4:00–8:00, 9:00–12:00, 13:00–16:00 (40h per week).
export const SLOTS: { weekday: Slot[]; saturday: Slot[]; sunday: Slot[] } = {
  weekday: [
    { id: "rust", start: "04:00", end: "06:30", track: "rust", minutes: 150 },
    { id: "solidity", start: "06:30", end: "07:15", track: "solidity", minutes: 45 },
    { id: "english", start: "07:15", end: "08:00", track: "english", minutes: 45 },
  ],
  saturday: [
    { id: "rust", start: "04:00", end: "08:00", track: "rust", minutes: 240 },
    { id: "solidity", start: "09:00", end: "12:00", track: "solidity", minutes: 180 },
    { id: "upwork", start: "13:00", end: "16:00", track: "upwork", minutes: 180 },
  ],
  sunday: [
    { id: "rust", start: "04:00", end: "08:00", track: "rust", minutes: 240 },
    { id: "interview", start: "09:00", end: "12:00", track: "interview", minutes: 180 },
    { id: "english", start: "13:00", end: "15:00", track: "english", minutes: 120 },
    { id: "review", start: "15:00", end: "16:00", track: "review", minutes: 60 },
  ],
};

const L = {
  rustCourse: { label: bi("Rust course (85 videos)", "Khoá Rust 85 video"), url: "/rust" },
  rustBook: { label: "The Rust Book", url: "https://doc.rust-lang.org/book/" },
  rustlings: { label: "Rustlings", url: "https://rustlings.rust-lang.org/" },
  exercism: { label: "Exercism Rust", url: "https://exercism.org/tracks/rust" },
  tokio: { label: "Tokio tutorial", url: "https://tokio.rs/tokio/tutorial" },
  asyncBook: { label: "Async Rust book", url: "https://rust-lang.github.io/async-book/" },
  solanaDocs: { label: "Solana docs", url: "https://solana.com/docs" },
  programExamples: { label: "Solana program examples", url: "https://github.com/solana-foundation/program-examples" },
  anchor: { label: "Anchor docs", url: "https://www.anchor-lang.com/docs" },
  libp2p: { label: "rust-libp2p", url: "https://github.com/libp2p/rust-libp2p" },
  scaling: { label: "Ethereum scaling (rollups)", url: "https://ethereum.org/developers/docs/scaling/" },
  reth: { label: "Reth", url: "https://reth.rs/" },
  revm: { label: "revm", url: "https://github.com/bluealloy/revm" },
  opDocs: { label: "OP Stack docs", url: "https://docs.optimism.io/" },
  kona: { label: bi("Kona (OP Stack in Rust)", "Kona (OP Stack bằng Rust)"), url: "https://github.com/op-rs/kona" },
  sp1: { label: "SP1 zkVM", url: "https://docs.succinct.xyz/" },
  stylus: { label: "Arbitrum Stylus (Rust)", url: "https://docs.arbitrum.io/stylus/gentle-introduction" },
  solidityDocs: { label: "Solidity docs", url: "https://docs.soliditylang.org/" },
  foundry: { label: "Foundry", url: "https://getfoundry.sh/" },
  openzeppelin: { label: "OpenZeppelin Contracts", url: "https://docs.openzeppelin.com/contracts" },
  ethernaut: { label: "Ethernaut", url: "https://ethernaut.openzeppelin.com/" },
  dvd: { label: "Damn Vulnerable DeFi", url: "https://www.damnvulnerabledefi.xyz/" },
  uniswapBook: { label: "Uniswap V3 Development Book", url: "https://uniswapv3book.com/" },
  erc4337: { label: "ERC-4337 docs", url: "https://docs.erc4337.io/" },
  code4rena: { label: "Code4rena reports", url: "https://code4rena.com/reports" },
  behavioral: {
    label: "Behavioral interview (Tech Interview Handbook)",
    url: "https://www.techinterviewhandbook.org/behavioral-interview/",
  },
  interviewHandbook: { label: "Tech Interview Handbook", url: "https://www.techinterviewhandbook.org/" },
  leetcode: { label: "LeetCode", url: "https://leetcode.com/" },
  systemDesign: { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer" },
  upwork: { label: "Upwork", url: "https://www.upwork.com/" },
} satisfies Record<string, Link>;

const proposals = (extra: Text[] = []): Focus => ({
  title: bi("Find jobs and send proposals", "Tìm job và gửi proposal"),
  tasks: [
    bi("Check new jobs from your saved searches", "Lọc job mới từ các bộ tìm kiếm đã lưu"),
    bi("Send ~5 proposals", "Gửi ~5 proposal"),
    ...extra,
    bi("Log proposals, replies and interviews", "Ghi lại: số proposal, phản hồi, phỏng vấn"),
  ],
  links: [L.upwork],
});

export const WEEKS: Week[] = [
  {
    // Days before the first Monday: a kickoff. With the default Sunday start it is day 1 only.
    week: 0,
    focus: {
      rust: {
        title: bi("Kickoff: set up + Rust course day 1", "Khởi động: cài đặt + Khoá Rust ngày 1"),
        tasks: [
          bi("Follow Rust course day 1 on the course page", "Học Khoá Rust ngày 1 trên trang khoá học"),
          bi("Set up your editor: VS Code + rust-analyzer", "Cài editor: VS Code + rust-analyzer"),
          bi("Create a GitHub repo for your 100-day code and notes", "Tạo repo GitHub cho code và ghi chú 100 ngày"),
        ],
        links: [L.rustCourse, L.rustBook],
      },
      solidity: {
        title: bi("Kickoff: Solidity setup", "Khởi động: chuẩn bị Solidity"),
        tasks: [
          bi("Install Foundry (foundryup)", "Cài Foundry (foundryup)"),
          bi("Skim the Solidity docs and note what you've forgotten", "Lướt Solidity docs, ghi lại phần đã quên"),
        ],
        links: [L.foundry, L.solidityDocs],
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
      interview: {
        title: bi("Job research & baseline", "Tìm hiểu job & đánh giá xuất phát điểm"),
        tasks: [
          bi(
            "Read 10 Rust / blockchain job posts and list the skills they ask for",
            "Đọc 10 tin tuyển dụng Rust / blockchain, liệt kê kỹ năng họ yêu cầu",
          ),
          bi("Rate yourself 1–5 on each skill", "Tự chấm 1–5 cho từng kỹ năng"),
          bi("Pick 3 target roles or companies", "Chọn 3 vị trí hoặc công ty mục tiêu"),
        ],
        links: [L.interviewHandbook],
      },
      upwork: {
        title: bi("Kickoff: Upwork audit", "Khởi động: rà soát Upwork"),
        tasks: [
          bi("Review your current Upwork profile and CV", "Xem lại profile Upwork và CV hiện tại"),
          bi("Save 5 job posts you would like to win", "Lưu 5 job bạn muốn giành được"),
        ],
        links: [L.upwork],
      },
      review: {
        title: bi("Plan the 100 days", "Lên kế hoạch 100 ngày"),
        tasks: [
          bi("Read the roadmap and the goal of each phase", "Đọc lộ trình và mục tiêu từng giai đoạn"),
          bi(
            "Set a 3:45 AM alarm and block the study slots in your calendar",
            "Đặt báo thức 3:45 sáng và chặn các khung giờ học trên lịch",
          ),
          bi("Commit to one rule: never miss two days in a row", "Cam kết một quy tắc: không bỏ 2 ngày liên tiếp"),
        ],
      },
    },
  },
  {
    week: 1,
    focus: {
      rust: {
        title: bi("Rust for beginners course (85 videos)", "Khoá Rust for beginners (85 video)"),
        tasks: [
          bi("Follow the Rust course day by day (Rust course page)", "Học theo Khoá Rust từng ngày (trang Khoá Rust)"),
          bi("Watch all 85 videos", "Xem hết 85 video"),
          bi("Do the Rustlings exercises for each day's topics", "Làm Rustlings theo chủ đề từng ngày"),
          bi("Get the Grep project running", "Project Grep chạy được"),
          bi(
            "Sunday: catch up on anything left and write a 1-page course summary",
            "Chủ nhật: học bù phần còn thiếu và viết tóm tắt khoá học 1 trang",
          ),
        ],
        links: [L.rustCourse, L.rustlings],
      },
      solidity: {
        title: bi("Check overview: Solidity 0.8.x", "Check overview: Solidity 0.8.x"),
        tasks: [
          bi("Review types, storage / memory / calldata", "Ôn types, storage / memory / calldata"),
          bi(
            "Review custom errors, events, modifiers, receive / fallback",
            "Ôn custom errors, events, modifiers, receive / fallback",
          ),
          bi("Install Foundry: forge init, forge test", "Cài Foundry: forge init, forge test"),
          bi("Rewrite a basic ERC-20 with tests", "Viết lại ERC-20 cơ bản có test"),
        ],
        links: [L.solidityDocs, L.foundry],
      },
      english: {
        title: bi("2-minute self-introduction", "Giới thiệu bản thân 2 phút"),
        tasks: [
          bi("Write your “Tell me about yourself” (~250 words)", "Viết bài “Tell me about yourself” (~250 từ)"),
          bi("Record it, listen back, fix pronunciation", "Ghi âm, nghe lại, sửa phát âm"),
          bi("Say it fluently without notes", "Nói trơn tru không cần nhìn"),
        ],
        links: [L.behavioral],
      },
      interview: {
        title: bi("Rust basics questions", "Câu hỏi Rust cơ bản"),
        tasks: [
          bi("Ownership, borrowing, move vs copy", "Ownership, borrowing, move vs copy"),
          bi("String vs &str, Vec, Option / Result", "String vs &str, Vec, Option / Result"),
          bi("Answer 10 questions, flag the ones you're unsure of", "Tự trả lời 10 câu, đánh dấu câu chưa chắc"),
        ],
        links: [L.rustBook],
      },
      upwork: {
        title: bi("Fix the CV + set up your profile", "Sửa CV + dựng profile"),
        tasks: [
          bi(
            "Fix the CV from the review: contact info, timeline, typos",
            "Sửa CV theo bản review: thông tin liên hệ, mốc thời gian, lỗi chính tả",
          ),
          bi("Write a Rust / Solidity focused title + overview", "Viết title + overview hướng Rust / Solidity"),
          bi("Add 3 projects to the portfolio", "Thêm 3 dự án vào portfolio"),
          bi("Pick an hourly rate", "Chọn hourly rate"),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 2,
    focus: {
      rust: {
        title: bi("Advanced Rust Book + Rustlings", "Rust Book nâng cao + Rustlings"),
        tasks: [
          bi("Rust Book ch.15: Box, Rc, RefCell", "Rust Book ch.15: Box, Rc, RefCell"),
          bi("Rust Book ch.16: threads, channels, Mutex, Arc", "Rust Book ch.16: threads, channels, Mutex, Arc"),
          bi("Rust Book ch.17–18: async basics, trait objects", "Rust Book ch.17–18: async cơ bản, trait objects"),
          bi("Finish 100% of Rustlings", "Hoàn thành 100% Rustlings"),
        ],
        links: [L.rustBook, L.rustlings],
      },
      solidity: {
        title: bi("Rewrite an old contract with Foundry", "Viết lại 1 contract cũ bằng Foundry"),
        tasks: [
          bi("Pick an old contract (DaoLaunch vesting / staking)", "Chọn contract cũ (vesting / staking của DaoLaunch)"),
          bi("Port it to Foundry with unit tests", "Port sang Foundry, viết unit test"),
          bi("Measure gas with forge snapshot", "Đo gas bằng forge snapshot"),
          bi("Push the repo to GitHub", "Push repo lên GitHub"),
        ],
        links: [L.foundry, L.openzeppelin],
      },
      english: {
        title: bi("Tell your 3 projects in English", "Kể 3 dự án bằng tiếng Anh"),
        tasks: [
          bi("Tamameme: problem, role, result", "Tamameme: vấn đề, vai trò, kết quả"),
          bi("WritersBase: architecture, automatic royalties", "WritersBase: kiến trúc, royalty tự động"),
          bi("Titan: validators, Go / Rust APIs", "Titan: validator, API Go / Rust"),
          bi("Record each story in ≤ 2 minutes", "Ghi âm mỗi câu chuyện ≤ 2 phút"),
        ],
      },
      interview: {
        title: bi("Rust: traits, generics, lifetimes", "Rust: traits, generics, lifetimes"),
        tasks: [
          bi("Traits vs generics, trait objects (dyn)", "Trait vs generic, trait objects (dyn)"),
          bi("Lifetime elision, 'static", "Lifetime elision, 'static"),
          bi("Smart pointers: Box / Rc / RefCell / Arc", "Smart pointers: Box / Rc / RefCell / Arc"),
          bi("Write down 10 questions with answers", "Ghi 10 câu hỏi kèm câu trả lời"),
        ],
      },
      upwork: {
        title: bi("Finish the profile", "Hoàn thiện profile"),
        tasks: [
          bi("Specialized profile: Blockchain / Rust", "Specialized profile: Blockchain / Rust"),
          bi("Save 3 job searches: Rust, Solana, Solidity", "Lưu 3 bộ tìm kiếm job: Rust, Solana, Solidity"),
          bi(
            "Write 2 proposal templates: Solidity and Rust / Solana",
            "Viết 2 mẫu proposal: Solidity và Rust / Solana",
          ),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 3,
    focus: {
      rust: {
        title: bi("Practice: a Rust CLI project", "Thực hành: project Rust CLI"),
        tasks: [
          bi("Exercism Rust: 10 exercises", "Exercism Rust: 10 bài"),
          bi("Error handling with thiserror / anyhow", "Error handling với thiserror / anyhow"),
          bi("Tests + cargo clippy + cargo fmt", "Test + cargo clippy + cargo fmt"),
          bi("Tokio basics: async / await, spawn", "Tokio cơ bản: async / await, spawn"),
          bi(
            "CLI project (e.g. read blocks over RPC) + README",
            "Project CLI (ví dụ: đọc block qua RPC) + README",
          ),
        ],
        links: [L.exercism, L.tokio],
      },
      solidity: {
        title: bi("Ethernaut levels 1–10", "Ethernaut level 1–10"),
        tasks: [
          bi("Solve levels 1–10", "Giải level 1–10"),
          bi("Write down each level's vulnerability and fix", "Ghi lỗ hổng và cách sửa của từng level"),
        ],
        links: [L.ethernaut],
      },
      english: {
        title: bi("10 common HR questions", "10 câu hỏi HR phổ biến"),
        tasks: [
          "Why are you leaving? Why this company?",
          "Strengths & weaknesses",
          "Salary expectation",
          bi("Record and grade yourself", "Ghi âm và tự chấm điểm"),
        ],
        links: [L.behavioral],
      },
      interview: {
        title: bi("Phase 1 review", "Ôn tập giai đoạn 1"),
        tasks: [
          bi(
            "Self-check: ownership, traits, lifetimes, smart pointers, concurrency",
            "Tự kiểm tra: ownership, traits, lifetimes, smart pointers, concurrency",
          ),
          bi("Live coding: 5 LeetCode Easy problems in Rust", "Live coding: 5 bài LeetCode Easy bằng Rust"),
        ],
        links: [L.leetcode],
      },
      upwork: proposals(),
    },
  },
  {
    week: 4,
    focus: {
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
      solidity: {
        title: bi("Ethernaut levels 11–20", "Ethernaut level 11–20"),
        tasks: [
          bi("Solve levels 11–20", "Giải level 11–20"),
          bi("Write down each vulnerability and fix", "Ghi lỗ hổng và cách sửa"),
        ],
        links: [L.ethernaut],
      },
      english: {
        title: "STAR stories 1–5",
        tasks: [
          bi("Your hardest technical challenge", "Thử thách kỹ thuật khó nhất"),
          bi("A production bug you fixed", "Lần sửa bug trên production"),
          bi("A disagreement with your team", "Lần bất đồng với team"),
          bi("A time you led the team", "Lần dẫn dắt team"),
          bi("A failure and what you learned", "Lần thất bại và bài học"),
        ],
        links: [L.behavioral],
      },
      interview: {
        title: "Rust: concurrency & error handling",
        tasks: [
          "Send / Sync, Arc<Mutex<T>>",
          bi("Result, the ? operator, custom errors", "Result, toán tử ?, custom error"),
          bi("5 LeetCode Medium problems in Rust", "5 bài LeetCode Medium bằng Rust"),
        ],
        links: [L.leetcode],
      },
      upwork: proposals([bi("Adjust the proposal template from feedback", "Chỉnh mẫu proposal theo phản hồi")]),
    },
  },
  {
    week: 5,
    focus: {
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
      solidity: {
        title: bi("Foundry: fuzz, invariant, fork tests", "Foundry: fuzz, invariant, fork test"),
        tasks: [
          bi("Fuzz tests for the week 2 contract", "Fuzz test cho contract tuần 2"),
          bi("Invariant tests with a handler", "Invariant test với handler"),
          bi("Mainnet fork test", "Fork test trên mainnet"),
        ],
        links: [L.foundry],
      },
      english: {
        title: "STAR stories 6–10",
        tasks: [
          bi("Write 5 more STAR stories", "Viết thêm 5 câu chuyện STAR"),
          bi("Record all 10 stories and listen back", "Ghi âm cả 10 câu chuyện, tự nghe lại"),
        ],
        links: [L.behavioral],
      },
      interview: {
        title: bi("Solana basics questions", "Câu hỏi Solana cơ bản"),
        tasks: [
          "Account model vs EVM storage",
          bi("What is a PDA and why the bump?", "PDA là gì, vì sao cần bump"),
          "Rent, compute units",
        ],
        links: [L.solanaDocs],
      },
      upwork: proposals(),
    },
  },
  {
    week: 6,
    focus: {
      rust: {
        title: bi("Anchor + start Project 1", "Anchor + bắt đầu Project 1"),
        tasks: [
          "Anchor: account constraints, errors, events",
          bi("Anchor tests in TypeScript", "Test Anchor bằng TypeScript"),
          bi(
            "Design Project 1 (escrow / marketplace): list, buy, cancel, fee",
            "Thiết kế Project 1 (escrow / marketplace): list, buy, cancel, fee",
          ),
          bi("Code the list + buy instructions", "Code instruction list + buy"),
        ],
        links: [L.anchor],
      },
      solidity: {
        title: "Proxy + EIP-712",
        tasks: [
          "UUPS vs Transparent proxy, storage collision",
          "EIP-712 + permit (ERC-2612)",
          bi("Write an upgradeable contract and test the upgrade", "Viết 1 contract upgradeable và test upgrade"),
        ],
        links: [L.openzeppelin],
      },
      english: {
        title: bi("Shadowing tech talks", "Shadowing tech talk"),
        tasks: [
          bi("15 minutes every morning shadowing a tech talk", "Mỗi sáng 15 phút nói nhại theo 1 tech talk"),
          bi("Collect 20 common technical phrases", "Ghi 20 cụm từ kỹ thuật hay dùng"),
        ],
      },
      interview: {
        title: bi("Solana: Anchor & security", "Solana: Anchor & bảo mật"),
        tasks: [
          bi("Missing signer / owner checks", "Thiếu signer / owner check"),
          "Account confusion, PDA collision",
          "Arithmetic overflow",
        ],
        links: [L.anchor],
      },
      upwork: proposals(),
    },
  },
  {
    week: 7,
    focus: {
      rust: {
        title: bi("Finish Project 1", "Hoàn thiện Project 1"),
        tasks: [
          bi("cancel, fee and royalty instructions", "Instruction cancel, fee, royalty"),
          bi("Security review with the week 6 checklist", "Kiểm tra bảo mật theo checklist tuần 6"),
          bi("Deploy to devnet", "Deploy lên devnet"),
          bi("TypeScript client + README + architecture diagram", "Client TypeScript + README + sơ đồ kiến trúc"),
        ],
        links: [L.anchor, L.solanaDocs],
      },
      solidity: {
        title: "Damn Vulnerable DeFi 1–5",
        tasks: [
          bi("Solve challenges 1–5", "Giải challenge 1–5"),
          bi("Write down the attack techniques", "Ghi lại kỹ thuật tấn công"),
        ],
        links: [L.dvd],
      },
      english: {
        title: bi("Present Project 1", "Thuyết trình Project 1"),
        tasks: [
          bi("A 5-minute presentation in English", "Bài thuyết trình 5 phút bằng tiếng Anh"),
          bi("Record a demo video", "Quay video demo"),
        ],
      },
      interview: {
        title: bi("Solana technical mock", "Mock kỹ thuật Solana"),
        tasks: [
          bi("45-minute self mock: explain Project 1", "Tự mock 45 phút: giải thích Project 1"),
          bi("Answer Solana security questions", "Trả lời câu hỏi bảo mật Solana"),
        ],
      },
      upwork: {
        title: bi("Add Project 1 to the portfolio", "Đưa Project 1 vào portfolio"),
        tasks: [
          bi("Add the repo + demo video to your profile", "Thêm repo + video demo vào profile"),
          bi("Send ~5 proposals for Solana jobs", "Gửi ~5 proposal cho job Solana"),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 8,
    focus: {
      rust: {
        title: bi("Foundations for core chain work", "Nền tảng cho core chain"),
        tasks: [
          bi(
            "Deep async: tokio runtime, select!, channels, Send / Sync, Pin",
            "Async sâu: tokio runtime, select!, channels, Send / Sync, Pin",
          ),
          "Serialization: serde, borsh, bincode",
          "Crypto: SHA-256 / Keccak, ed25519, secp256k1",
          bi("Networking: TCP server / client with tokio", "Networking: TCP server / client với tokio"),
        ],
        links: [L.asyncBook, L.tokio],
      },
      solidity: {
        title: "Damn Vulnerable DeFi 6–10",
        tasks: [
          bi("Solve challenges 6–10", "Giải challenge 6–10"),
          bi("Write down the attack techniques", "Ghi lại kỹ thuật tấn công"),
        ],
        links: [L.dvd],
      },
      english: {
        title: bi("Explain ownership & async in English", "Giải thích ownership & async bằng tiếng Anh"),
        tasks: [
          bi("2 minutes per concept, recorded", "Mỗi khái niệm nói 2 phút, ghi âm"),
          bi("Listen back and fix awkward wording", "Nghe lại, sửa từ dùng chưa chuẩn"),
        ],
      },
      interview: {
        title: "Async Rust",
        tasks: ["Future, poll, executor", "tokio::spawn vs spawn_blocking", bi("Deadlocks and cancellation", "Deadlock và cancellation")],
        links: [L.asyncBook],
      },
      upwork: proposals(),
    },
  },
  {
    week: 9,
    focus: {
      rust: {
        title: bi("Mini-chain (part 1)", "Mini-chain (phần 1)"),
        tasks: [
          "Block, header, hash, merkle root",
          bi("Signed transactions + verification", "Transaction có chữ ký + verify"),
          bi("Mempool + state (account balances)", "Mempool + state (số dư account)"),
          bi("Storage with RocksDB or sled", "Lưu trữ bằng RocksDB hoặc sled"),
          bi("Tests for every module", "Test cho từng module"),
        ],
      },
      solidity: {
        title: bi("ERC-4626 + AMM math", "ERC-4626 + toán AMM"),
        tasks: [
          bi("ERC-4626 vaults and rounding", "ERC-4626 vault và cách làm tròn"),
          "Uniswap v2: constant product",
          bi("Uniswap v3: concentrated liquidity basics", "Uniswap v3: concentrated liquidity cơ bản"),
        ],
        links: [L.uniswapBook, L.openzeppelin],
      },
      english: {
        title: bi("Explain PDAs and reentrancy in English", "Giải thích PDA và reentrancy bằng tiếng Anh"),
        tasks: [
          bi("2 minutes per concept, recorded", "Mỗi khái niệm nói 2 phút, ghi âm"),
          bi("Ask yourself 3 follow-up questions and answer them", "Tự đặt 3 câu hỏi phản biện và trả lời"),
        ],
      },
      interview: {
        title: bi("Blockchain core questions", "Câu hỏi blockchain core"),
        tasks: ["Merkle tree, Patricia trie", "PoW vs PoS, finality", "Mempool, fee market"],
      },
      upwork: proposals(),
    },
  },
  {
    week: 10,
    focus: {
      rust: {
        title: bi("Mini-chain (part 2)", "Mini-chain (phần 2)"),
        tasks: [
          bi("P2P with rust-libp2p: gossip blocks and transactions", "P2P bằng rust-libp2p: gossip block và transaction"),
          bi("Simple PoS consensus (rotating validators)", "Consensus PoS đơn giản (validator luân phiên)"),
          "JSON-RPC: sendTransaction, getBlock",
          bi("Run 3 local nodes that stay in sync", "Chạy 3 node local đồng bộ được với nhau"),
        ],
        links: [L.libp2p],
      },
      solidity: {
        title: bi("ERC-4337 + gas optimization", "ERC-4337 + tối ưu gas"),
        tasks: [
          "Account abstraction: UserOperation, EntryPoint, bundler",
          "Gas: storage packing, unchecked, calldata",
        ],
        links: [L.erc4337],
      },
      english: {
        title: bi("System design vocabulary", "Từ vựng system design"),
        tasks: [
          bi("Learn 30 terms: throughput, latency, sharding…", "Học 30 thuật ngữ: throughput, latency, sharding…"),
          bi("Describe the mini-chain architecture in English", "Mô tả kiến trúc mini-chain bằng tiếng Anh"),
        ],
      },
      interview: {
        title: bi("Solidity questions", "Câu hỏi Solidity"),
        tasks: [
          "Storage layout, delegatecall",
          "Reentrancy, oracle manipulation",
          bi("Proxy upgrade risks", "Rủi ro khi upgrade proxy"),
        ],
      },
      upwork: proposals(),
    },
  },
  {
    week: 11,
    focus: {
      rust: {
        title: "Layer 2: rollups, Reth, revm",
        tasks: [
          "Rollup: sequencer, batch, state root, data availability",
          "Optimistic vs ZK rollup: fraud proof vs validity proof",
          bi("Read the Reth architecture: staged sync, revm", "Đọc kiến trúc Reth: staged sync, revm"),
          bi("Execute an EVM transaction in Rust with revm", "Dùng revm thực thi 1 transaction EVM bằng Rust"),
          bi("Read OP Stack and Kona (fault proofs in Rust)", "Đọc OP Stack và Kona (fault proof viết bằng Rust)"),
        ],
        links: [L.scaling, L.reth, L.revm, L.opDocs, L.kona],
      },
      solidity: {
        title: bi("Read audit reports", "Đọc audit report"),
        tasks: [
          bi("Read 3 Code4rena reports", "Đọc 3 report trên Code4rena"),
          bi("Summarize the 10 most common bugs", "Tóm tắt 10 lỗi hay gặp"),
        ],
        links: [L.code4rena],
      },
      english: {
        title: bi("Explain while drawing diagrams", "Vừa vẽ sơ đồ vừa giải thích"),
        tasks: [
          bi("Draw a rollup architecture and explain it for 5 minutes", "Vẽ kiến trúc rollup và giải thích 5 phút"),
          bi("Record and listen back", "Ghi âm, nghe lại"),
        ],
      },
      interview: {
        title: bi("System design for blockchain", "System design cho blockchain"),
        tasks: [
          bi("Design an indexer", "Thiết kế indexer"),
          bi("Design an L1 ↔ L2 bridge", "Thiết kế bridge L1 ↔ L2"),
          bi("Design validator / RPC infrastructure", "Thiết kế hạ tầng validator / RPC"),
        ],
        links: [L.systemDesign],
      },
      upwork: proposals(),
    },
  },
  {
    week: 12,
    focus: {
      rust: {
        title: "Project 2: mini rollup",
        tasks: [
          bi("Sequencer that takes transactions and executes them with revm", "Sequencer nhận transaction, thực thi bằng revm"),
          bi(
            "Batch poster: push batches + state roots to a local L1 (anvil)",
            "Batch poster: đẩy batch + state root lên L1 local (anvil)",
          ),
          bi("L1 contract that stores state roots (Solidity + Foundry)", "Contract L1 lưu state root (Solidity + Foundry)"),
          bi("(Optional) prove the state transition with SP1", "(Tuỳ chọn) chứng minh state transition bằng SP1"),
          bi("README + architecture diagram", "README + sơ đồ kiến trúc"),
        ],
        links: [L.revm, L.sp1, L.foundry, L.stylus],
      },
      solidity: {
        title: bi("Solidity project: marketplace", "Project Solidity: marketplace"),
        tasks: [
          "Marketplace: list, buy, cancel, fee, royalty",
          "Foundry: unit + fuzz + invariant tests",
          bi("Deploy to testnet + README", "Deploy testnet + README"),
        ],
        links: [L.foundry, L.openzeppelin],
      },
      english: {
        title: "Mock interviews 1–2",
        tasks: [
          bi("2 mock interviews (friends or AI)", "2 buổi mock (bạn bè hoặc AI)"),
          bi("Note weak spots and practice them", "Ghi điểm yếu, luyện lại"),
        ],
      },
      interview: {
        title: bi("Layer 2 technical mock", "Mock kỹ thuật Layer 2"),
        tasks: [
          bi("Explain Project 2 in 10 minutes", "Giải thích Project 2 trong 10 phút"),
          bi("Answer rollup questions", "Trả lời câu hỏi về rollup"),
        ],
      },
      upwork: {
        title: bi("Add Project 2 to the portfolio", "Đưa Project 2 vào portfolio"),
        tasks: [
          bi("Add the repo + diagram to your profile", "Thêm repo + sơ đồ vào profile"),
          bi("Send ~5 proposals for Rust / L2 jobs", "Gửi ~5 proposal cho job Rust / L2"),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 13,
    focus: {
      rust: {
        title: "Interview: Rust",
        tasks: [
          bi("A set of 50 Rust questions", "Bộ 50 câu hỏi Rust"),
          bi("Live coding: 10 LeetCode Medium problems in Rust", "Live coding: 10 bài LeetCode Medium bằng Rust"),
          bi("Review the 3 Rust repos, polish the READMEs", "Rà lại 3 repo Rust, sửa README"),
        ],
        links: [L.leetcode, L.interviewHandbook],
      },
      solidity: {
        title: "Interview: Solidity",
        tasks: [
          bi("A set of 40 Solidity questions", "Bộ 40 câu hỏi Solidity"),
          bi("Re-explain the Ethernaut / DVD challenges you solved", "Giải thích lại các bài Ethernaut / DVD đã làm"),
        ],
      },
      english: {
        title: "Mock interviews 3–5",
        tasks: [bi("3 mock interviews", "3 buổi mock"), bi("Note weak spots and practice them", "Ghi điểm yếu, luyện lại")],
      },
      interview: {
        title: bi("Full mock interviews", "Mock interview đầy đủ"),
        tasks: [
          bi("2 technical mocks", "2 buổi mock kỹ thuật"),
          bi("Collect the answers that went badly", "Tổng hợp câu trả lời chưa tốt"),
        ],
        links: [L.interviewHandbook],
      },
      upwork: {
        title: bi("Client interviews", "Phỏng vấn với client"),
        tasks: [
          bi("Practice a 30-minute client call", "Luyện cuộc gọi 30 phút với client"),
          bi("Prepare questions on scope, timeline and rate", "Chuẩn bị câu hỏi về scope, timeline, rate"),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 14,
    focus: {
      rust: {
        title: "Interview: system design + Solana / L2",
        tasks: [
          bi("System design: 3 problems", "System design: 3 đề"),
          bi("Rust / Solana / L2 technical mock", "Mock kỹ thuật Rust / Solana / L2"),
          bi("Apply to 10 full-time Rust jobs", "Ứng tuyển 10 job Rust full-time"),
        ],
        links: [L.systemDesign],
      },
      solidity: {
        title: bi("Audit-style code review", "Code review kiểu audit"),
        tasks: [
          bi("Find bugs in 3 sample contracts", "Tìm bug trong 3 contract mẫu"),
          bi("Write a short report for each", "Viết báo cáo ngắn cho từng contract"),
        ],
        links: [L.code4rena],
      },
      english: {
        title: "Mock interviews 6–8",
        tasks: [bi("3 mock interviews", "3 buổi mock"), bi("Compare with your Day 1 recording", "So sánh với bản ghi âm Ngày 1")],
      },
      interview: {
        title: bi("Final mock", "Mock cuối"),
        tasks: [
          bi("Full mock: technical + behavioral", "Mock đầy đủ: kỹ thuật + behavioral"),
          bi("Lock in your model answers", "Chốt bộ câu trả lời mẫu"),
        ],
      },
      upwork: {
        title: bi("Apply + negotiate", "Ứng tuyển + đàm phán"),
        tasks: [
          bi("Send proposals for long-term jobs", "Gửi proposal cho job dài hạn"),
          bi("Practice negotiating rate and contract", "Luyện đàm phán rate và hợp đồng"),
        ],
        links: [L.upwork],
      },
    },
  },
  {
    week: 15,
    focus: {
      rust: {
        title: bi("100-day wrap-up", "Tổng kết 100 ngày"),
        tasks: [
          bi("Finalize the CV", "Chốt CV bản cuối"),
          bi("Check the 4 GitHub repos", "Kiểm tra 4 repo trên GitHub"),
          bi("Write a 100-day retrospective", "Viết bài tổng kết 100 ngày"),
        ],
      },
      solidity: {
        title: bi("Solidity wrap-up", "Tổng kết Solidity"),
        tasks: [
          bi("List what you upgraded", "Liệt kê kiến thức đã nâng cấp"),
          bi("Pick 3 technical stories for interviews", "Chọn 3 câu chuyện kỹ thuật để kể khi phỏng vấn"),
        ],
      },
      english: {
        title: bi("English wrap-up", "Tổng kết English"),
        tasks: [bi("Record your final self-intro, compare with Day 1", "Ghi âm bài giới thiệu cuối cùng, so với Ngày 1")],
      },
    },
  },
];

/** Sunday 15:00–16:00 of every week after the kickoff. */
export const REVIEW_FOCUS: Focus = {
  title: bi("Weekly review", "Review tuần"),
  tasks: [
    bi("Compare total hours with the plan", "So tổng giờ học với kế hoạch"),
    bi("Carry unfinished work to next week", "Dời việc chưa xong sang tuần sau"),
    bi("Write down 3 things you learned this week", "Ghi 3 điều học được trong tuần"),
    bi("Pick next week's top 3 priorities", "Chọn 3 ưu tiên cho tuần sau"),
  ],
};
