import type { Text } from "@/lib/text";

export type Video = {
  id: string;
  /** Lesson number shown in the video title; null for the bonus short. */
  lesson: number | null;
  title: string;
  seconds: number;
};

export type StudyDay = {
  day: number;
  title: Text;
  topic: Text;
  /** Estimated practice time in minutes. */
  practice: number;
  videos: Video[];
  tasks: Text[];
  links: { label: Text; url: string }[];
};

export type Course = {
  title: string;
  channel: string;
  playlist: string;
  days: StudyDay[];
};

// Video ids, titles and durations come from the YouTube playlist metadata. The 6-day split
// fits the plan's Rust slots for the Tuesday 27/10 start: 3h on days 1–4 (Tue–Fri) and
// 4h on days 5–6 (Sat/Sun, 05:00–08:00 + 16:00–17:00).
export const course: Course = {
  "title": "Rust for beginners (2025)",
  "channel": "Rustfully",
  "playlist": "https://www.youtube.com/playlist?list=PLAscMa3kKhHjBYOTrT20kpYMNQX95KU6i",
  "days": [
    {
      "day": 1,
      "title": {
        "en": "Setup & basics",
        "vi": "Cài đặt & cơ bản"
      },
      "topic": {
        "en": "Install Rust and Cargo, variables, shadowing, data types, functions, statements vs expressions.",
        "vi": "Cài Rust và Cargo, biến, shadowing, kiểu dữ liệu, hàm, statement vs expression."
      },
      "practice": 80,
      "videos": [
        {
          "id": "jpjo1HW5Fnk",
          "lesson": 0,
          "title": "Your first program in Rust (How to install Rust)",
          "seconds": 408
        },
        {
          "id": "vo-XbN7fq7Y",
          "lesson": 1,
          "title": "Getting started with Rust",
          "seconds": 167
        },
        {
          "id": "8tduMGPZsSk",
          "lesson": 2,
          "title": "Coding your first project in Rust",
          "seconds": 541
        },
        {
          "id": "j7npg1YOwkM",
          "lesson": 3,
          "title": "Creating variables in Rust",
          "seconds": 384
        },
        {
          "id": "JpbI7ULFwiw",
          "lesson": 4,
          "title": "Variable Shadowing in Rust",
          "seconds": 221
        },
        {
          "id": "h7ozfjDBQks",
          "lesson": 5,
          "title": "Data Types in Rust",
          "seconds": 246
        },
        {
          "id": "DYPqczdDYX8",
          "lesson": 6,
          "title": "Integers in Rust explained",
          "seconds": 519
        },
        {
          "id": "qThEYoNdk8g",
          "lesson": 7,
          "title": "Floats are also weird in Rust",
          "seconds": 256
        },
        {
          "id": "aNaQfxE7MHg",
          "lesson": 8,
          "title": "More important data types explained in Rust",
          "seconds": 229
        },
        {
          "id": "F6OmI1j9si4",
          "lesson": 9,
          "title": "Tuples are cool in Rust",
          "seconds": 394
        },
        {
          "id": "QaCrG3Bqnzk",
          "lesson": 10,
          "title": "Arrays are cool in Rust",
          "seconds": 303
        },
        {
          "id": "-j7uQD1K1FQ",
          "lesson": 11,
          "title": "Functions are awesome in Rust",
          "seconds": 264
        },
        {
          "id": "hS2NuElYD0U",
          "lesson": 12,
          "title": "Upgrade your functions in Rust",
          "seconds": 411
        },
        {
          "id": "Xy_50rq4T0Y",
          "lesson": 13,
          "title": "Statements vs expressions in Rust",
          "seconds": 230
        },
        {
          "id": "F2Qamg38RlE",
          "lesson": 14,
          "title": "Adding comments in Rust",
          "seconds": 348
        }
      ],
      "tasks": [
        {
          "en": "Install Rust (rustup) + VS Code with rust-analyzer",
          "vi": "Cài Rust (rustup) + VS Code với rust-analyzer"
        },
        {
          "en": "Install Rustlings: cargo install rustlings, rustlings init",
          "vi": "Cài Rustlings: cargo install rustlings, rustlings init"
        },
        "Rustlings: intro, variables, functions",
        "Rustlings: primitive_types",
        {
          "en": "Mini: °C ↔ °F temperature converter",
          "vi": "Mini: chương trình đổi nhiệt độ °C ↔ °F"
        }
      ],
      "links": [
        {
          "label": "Rust Book ch.3 — Common Concepts",
          "url": "https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    },
    {
      "day": 2,
      "title": "Control flow & ownership",
      "topic": {
        "en": "if/else and loops, then the most important part of Rust: ownership, String vs &str, clone and references.",
        "vi": "if/else và vòng lặp, rồi phần quan trọng nhất của Rust: ownership, String vs &str, clone và references."
      },
      "practice": 80,
      "videos": [
        {
          "id": "o1CmBrNrjos",
          "lesson": 15,
          "title": "Control flow in Rust",
          "seconds": 264
        },
        {
          "id": "xypZ4VQLF_E",
          "lesson": 16,
          "title": "Even more control flow in Rust",
          "seconds": 382
        },
        {
          "id": "y9Gux6PVOF4",
          "lesson": 17,
          "title": "Let if..else is really cool in Rust",
          "seconds": 124
        },
        {
          "id": "S487eVhfx4g",
          "lesson": 18,
          "title": "Learn Rust without internet",
          "seconds": 120
        },
        {
          "id": "IgtMPadb59w",
          "lesson": 19,
          "title": "“loop” is awesome in Rust",
          "seconds": 265
        },
        {
          "id": "geHaKgDYZLQ",
          "lesson": 20,
          "title": "While loops are cool in Rust",
          "seconds": 220
        },
        {
          "id": "tBo-exSqKtw",
          "lesson": 21,
          "title": "For loop is pretty awesome in Rust",
          "seconds": 294
        },
        {
          "id": "5hu6ggiJAvM",
          "lesson": 22,
          "title": "Better loop control in Rust",
          "seconds": 259
        },
        {
          "id": "TF-5LlagFkw",
          "lesson": 23,
          "title": "Getting started with ownership in Rust",
          "seconds": 232
        },
        {
          "id": "7ppbtgMtuok",
          "lesson": 24,
          "title": "String and &str in Rust",
          "seconds": 269
        },
        {
          "id": "9w6bneHBe80",
          "lesson": 25,
          "title": "Ownership is weird in Rust",
          "seconds": 368
        },
        {
          "id": "m4wOu_-7U2M",
          "lesson": 26,
          "title": "Cloning is cool in Rust",
          "seconds": 357
        },
        {
          "id": "FHNESx9S7ZM",
          "lesson": 27,
          "title": "Ownership is cool in Rust",
          "seconds": 440
        },
        {
          "id": "yxbNP2gq09s",
          "lesson": 28,
          "title": "What are references in Rust?",
          "seconds": 227
        },
        {
          "id": "1fGKz9nNN1E",
          "lesson": 29,
          "title": "Mutable references are cool in Rust",
          "seconds": 372
        },
        {
          "id": "EQrva1Lm6TY",
          "lesson": 30,
          "title": "Dangling references disgust me in Rust",
          "seconds": 164
        }
      ],
      "tasks": [
        "Rustlings: if",
        {
          "en": "Mini: FizzBuzz + an nth Fibonacci function",
          "vi": "Mini: FizzBuzz + hàm Fibonacci thứ n"
        },
        "Rustlings: move_semantics",
        {
          "en": "Read Rust Book ch.4 — Ownership",
          "vi": "Đọc Rust Book ch.4 — Ownership"
        }
      ],
      "links": [
        {
          "label": "Rust Book ch.4 — Ownership",
          "url": "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    },
    {
      "day": 3,
      "title": {
        "en": "Structs, enums & match",
        "vi": "Structs, enums & match"
      },
      "topic": {
        "en": "String slices, structs, methods, associated functions, enums, Option, match and if let.",
        "vi": "String slices, structs, methods, associated functions, enums, Option, match và if let."
      },
      "practice": 70,
      "videos": [
        {
          "id": "brqGSVI7CZY",
          "lesson": 31,
          "title": "Preparing for string slices in Rust",
          "seconds": 326
        },
        {
          "id": "QlhCHf2rmaQ",
          "lesson": 32,
          "title": "&str is really cool in Rust",
          "seconds": 569
        },
        {
          "id": "rdipeWDH628",
          "lesson": 33,
          "title": "Structs are awesome in Rust",
          "seconds": 477
        },
        {
          "id": "JambUKXDqk8",
          "lesson": 34,
          "title": "Cool move syntax in Rust",
          "seconds": 310
        },
        {
          "id": "3s_3IBXwlY4",
          "lesson": 35,
          "title": "Tuple structs are pretty cool in Rust",
          "seconds": 324
        },
        {
          "id": "7WOKYM24NG8",
          "lesson": 36,
          "title": "Structs provide clarity in Rust",
          "seconds": 416
        },
        {
          "id": "7jQrh7C_ISY",
          "lesson": 37,
          "title": "Methods are useful in Rust",
          "seconds": 396
        },
        {
          "id": "e0OLtBXi4eY",
          "lesson": 38,
          "title": "Associated methods are interesting in Rust",
          "seconds": 433
        },
        {
          "id": "ANj5wbqicDo",
          "lesson": 39,
          "title": "Enums are fun in Rust",
          "seconds": 451
        },
        {
          "id": "Tt8123sleQ0",
          "lesson": 40,
          "title": "There's no null type in Rust",
          "seconds": 449
        },
        {
          "id": "1hNDb4Kr9u4",
          "lesson": 41,
          "title": "I like \"match\" in Rust",
          "seconds": 431
        },
        {
          "id": "kun1AJCmgOo",
          "lesson": 42,
          "title": "\"match\" like a pro in Rust",
          "seconds": 496
        },
        {
          "id": "fy-RAbXIYXE",
          "lesson": 43,
          "title": "\"if let\" is pretty hype in Rust",
          "seconds": 385
        }
      ],
      "tasks": [
        "Rustlings: structs",
        "Rustlings: enums, options",
        {
          "en": "Mini: a Rectangle struct with area() and can_hold()",
          "vi": "Mini: struct Rectangle với area() và can_hold()"
        }
      ],
      "links": [
        {
          "label": "Rust Book ch.5 — Structs",
          "url": "https://doc.rust-lang.org/book/ch05-00-structs.html"
        },
        {
          "label": "Rust Book ch.6 — Enums & match",
          "url": "https://doc.rust-lang.org/book/ch06-00-enums.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    },
    {
      "day": 4,
      "title": {
        "en": "Error handling & project Grep",
        "vi": "Xử lý lỗi & project Grep"
      },
      "topic": {
        "en": "panic!, Result, error propagation and the ? operator, then your first real project: Grep.",
        "vi": "panic!, Result, propagate lỗi và toán tử ?, rồi project thật đầu tiên: Grep."
      },
      "practice": 90,
      "videos": [
        {
          "id": "1jxqXZYitRg",
          "lesson": 44,
          "title": "Error handling in Rust - time to panic!",
          "seconds": 427
        },
        {
          "id": "YHeV44PO368",
          "lesson": 45,
          "title": "Handling multiple errors with \"Result\" in Rust",
          "seconds": 454
        },
        {
          "id": "FcwwjxLb2ZE",
          "lesson": 46,
          "title": "Propagating errors in Rust",
          "seconds": 387
        },
        {
          "id": "9UdfjTcno0U",
          "lesson": 47,
          "title": "The Try operator (?) is amazing in Rust",
          "seconds": 452
        },
        {
          "id": "KR6Vb9b4HGw",
          "lesson": 48,
          "title": "When to panic! vs. when to use Result in Rust",
          "seconds": 662
        },
        {
          "id": "PX4dEky1pxA",
          "lesson": 49,
          "title": "Build your first real project (Grep) in Rust",
          "seconds": 944
        },
        {
          "id": "6RC78sUwvLw",
          "lesson": 50,
          "title": "This makes programming in Rust much more convenient",
          "seconds": 626
        }
      ],
      "tasks": [
        "Rustlings: error_handling",
        {
          "en": "Project: build Grep along with the video",
          "vi": "Project: code Grep theo video"
        },
        {
          "en": "Extend Grep: case-insensitive search (IGNORE_CASE env var)",
          "vi": "Mở rộng Grep: tìm không phân biệt hoa thường (biến môi trường IGNORE_CASE)"
        }
      ],
      "links": [
        {
          "label": "Rust Book ch.9 — Error Handling",
          "url": "https://doc.rust-lang.org/book/ch09-00-error-handling.html"
        },
        {
          "label": "Rust Book ch.12 — I/O Project (minigrep)",
          "url": "https://doc.rust-lang.org/book/ch12-00-an-io-project.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    },
    {
      "day": 5,
      "title": "Collections, modules, generics & traits",
      "topic": {
        "en": "Vec, String, format!, HashMap and HashSet, then packages, crates, modules, Cargo, generics and traits.",
        "vi": "Vec, String, format!, HashMap và HashSet, rồi packages, crates, modules, Cargo, generics và traits."
      },
      "practice": 95,
      "videos": [
        {
          "id": "vKaHELxQB_0",
          "lesson": 51,
          "title": "Vectors are awesome in Rust",
          "seconds": 650
        },
        {
          "id": "8mKUpb6KCGQ",
          "lesson": 52,
          "title": "Strings are complicated in Rust?",
          "seconds": 265
        },
        {
          "id": "ZntyLdUDzRU",
          "lesson": 53,
          "title": "I love \"format!\" in Rust",
          "seconds": 385
        },
        {
          "id": "dPX_7sArvms",
          "lesson": 54,
          "title": "Indexing strings isn't easy in Rust",
          "seconds": 601
        },
        {
          "id": "eQxFWiY9udg",
          "lesson": 55,
          "title": "What are hash maps in Rust?",
          "seconds": 361
        },
        {
          "id": "v4jLkoaULf4",
          "lesson": 56,
          "title": "Hash maps are cool in Rust",
          "seconds": 448
        },
        {
          "id": "joVHsfM7JxQ",
          "lesson": 57,
          "title": "Hash sets are great in Rust",
          "seconds": 685
        },
        {
          "id": "ZYbZI8kckLw",
          "lesson": 58,
          "title": "Packages and crates explained in Rust",
          "seconds": 391
        },
        {
          "id": "H73eleGb_u0",
          "lesson": 59,
          "title": "Modules are epic in Rust",
          "seconds": 482
        },
        {
          "id": "7AGw-IyoYqY",
          "lesson": 60,
          "title": "How to use \"lib.rs\" in Rust",
          "seconds": 486
        },
        {
          "id": "qytfhYWZcYA",
          "lesson": 81,
          "title": "Learn Rust Cargo in Only 11 Minutes",
          "seconds": 696
        },
        {
          "id": "5CGpjW28d74",
          "lesson": 61,
          "title": "Generic functions are awesome in Rust",
          "seconds": 472
        },
        {
          "id": "6scdNPwJlTI",
          "lesson": 62,
          "title": "Generic structs are cool in Rust",
          "seconds": 393
        },
        {
          "id": "TbAsRmHYpKc",
          "lesson": 63,
          "title": "I love Generics in Rust",
          "seconds": 412
        },
        {
          "id": "SBZm9LN-fCc",
          "lesson": 64,
          "title": "Traits in Rust are Awesome",
          "seconds": 333
        },
        {
          "id": "a_hdKTJGukk",
          "lesson": 65,
          "title": "Using traits as constraints in Rust",
          "seconds": 304
        },
        {
          "id": "pdNo8096vbc",
          "lesson": 66,
          "title": "Traits are useful in Rust",
          "seconds": 246
        },
        {
          "id": "zUT4LZQzbY0",
          "lesson": 67,
          "title": "Goodbye, Rust Traits",
          "seconds": 236
        }
      ],
      "tasks": [
        "Rustlings: vecs, strings, hashmaps",
        {
          "en": "Mini: count word frequency with a HashMap",
          "vi": "Mini: đếm tần suất từ bằng HashMap"
        },
        {
          "en": "Rustlings: modules + split Grep into lib.rs and main.rs",
          "vi": "Rustlings: modules + tách Grep thành lib.rs và main.rs"
        },
        "Rustlings: generics, traits",
        {
          "en": "Mini: a Summary trait for 2 different structs",
          "vi": "Mini: trait Summary cho 2 struct khác nhau"
        }
      ],
      "links": [
        {
          "label": "Rust Book ch.8 — Collections",
          "url": "https://doc.rust-lang.org/book/ch08-00-common-collections.html"
        },
        {
          "label": "Rust Book ch.7 — Packages, Crates & Modules",
          "url": "https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html"
        },
        {
          "label": "Rust Book ch.10 — Generics & Traits",
          "url": "https://doc.rust-lang.org/book/ch10-00-generics.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    },
    {
      "day": 6,
      "title": "Lifetimes, macros, closures & iterators",
      "topic": {
        "en": "Lifetimes, declarative macros, closures, iterators, Box and Rc, then review the whole course.",
        "vi": "Lifetimes, declarative macros, closures, iterators, Box và Rc, rồi ôn tập toàn khoá."
      },
      "practice": 130,
      "videos": [
        {
          "id": "YrXhyDzc9W8",
          "lesson": 68,
          "title": "Hello, Rust Lifetimes",
          "seconds": 237
        },
        {
          "id": "xFedJ4ECUhE",
          "lesson": 69,
          "title": "Lifetimes in Rust are nice",
          "seconds": 353
        },
        {
          "id": "TX2ZkVPBr8g",
          "lesson": 70,
          "title": "Lifetimes in Rust are important",
          "seconds": 391
        },
        {
          "id": "kgPvpsmRSdY",
          "lesson": 71,
          "title": "Lifetimes are everywhere in Rust",
          "seconds": 318
        },
        {
          "id": "ZYQatlMj9DA",
          "lesson": 72,
          "title": "Lifetimes make sense in Rust",
          "seconds": 366
        },
        {
          "id": "O0JmorjtkZY",
          "lesson": 73,
          "title": "Goodbye, Rust Lifetimes",
          "seconds": 242
        },
        {
          "id": "y_hxanYf3cU",
          "lesson": 74,
          "title": "Macros in Rust are Awesome",
          "seconds": 335
        },
        {
          "id": "PoVNQkmzu6c",
          "lesson": 75,
          "title": "I love declarative macros in Rust",
          "seconds": 492
        },
        {
          "id": "zuWYqwZwKf4",
          "lesson": 76,
          "title": "Diving deeper into Rust macros",
          "seconds": 497
        },
        {
          "id": "_Nqb3K0cxpo",
          "lesson": 77,
          "title": "Repetition patterns are cool in Rust",
          "seconds": 376
        },
        {
          "id": "NzIn-CwlQHc",
          "lesson": 78,
          "title": "Repetition patterns are great in Rust",
          "seconds": 314
        },
        {
          "id": "u61PYeCCfBo",
          "lesson": null,
          "title": "I love THIS tip for Rust devs",
          "seconds": 73
        },
        {
          "id": "sjgkMn55Q2c",
          "lesson": 79,
          "title": "Let's learn about closures in Rust",
          "seconds": 441
        },
        {
          "id": "2-L1bT1P9bE",
          "lesson": 80,
          "title": "Closures are awesome in Rust",
          "seconds": 484
        },
        {
          "id": "BEPhAIkw6x8",
          "lesson": 82,
          "title": "Iterators in Rust are Awesome",
          "seconds": 411
        },
        {
          "id": "f5zuJ7YnNso",
          "lesson": 83,
          "title": "Let's Learn About \"Box\" & \"Rc\" in Rust",
          "seconds": 436
        }
      ],
      "tasks": [
        {
          "en": "Rustlings: lifetimes + read Rust Book 10.3",
          "vi": "Rustlings: lifetimes + đọc Rust Book 10.3"
        },
        {
          "en": "Rustlings: macros + Mini: write your own vec!-like macro",
          "vi": "Rustlings: macros + Mini: tự viết một macro giống vec!"
        },
        "Rustlings: iterators, smart_pointers",
        {
          "en": "Rewrite Grep with iterators instead of loops",
          "vi": "Viết lại Grep dùng iterator thay vòng lặp"
        },
        {
          "en": "Review: go over your notes from all 6 days",
          "vi": "Ôn tập: xem lại ghi chú 6 ngày"
        }
      ],
      "links": [
        {
          "label": "Rust Book 10.3 — Lifetimes",
          "url": "https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html"
        },
        {
          "label": "Rust Book 20.5 — Macros",
          "url": "https://doc.rust-lang.org/book/ch20-05-macros.html"
        },
        {
          "label": "Rust Book ch.13 — Closures & Iterators",
          "url": "https://doc.rust-lang.org/book/ch13-00-functional-features.html"
        },
        {
          "label": "Rust Book ch.15 — Smart Pointers",
          "url": "https://doc.rust-lang.org/book/ch15-00-smart-pointers.html"
        },
        {
          "label": "Rustlings",
          "url": "https://rustlings.rust-lang.org/"
        }
      ]
    }
  ]
};
