import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./src/App";

jest.mock("./src/lib/supabase", () => {
  let rows = [];

  const reset = (next = []) => {
    rows = [...next];
  };

  const supabase = {
    __test: { reset },

    from: () => ({
      select: async () => ({ data: [...rows], error: null }),

      insert: (payload) => {
        const item = Array.isArray(payload) ? payload[0] : payload;

        return {
          select: () => ({
            single: async () => {
              const newRow = {
                id: String(Date.now()), // テスト用ID
                ...item,
              };
              rows = [newRow, ...rows];
              return { data: newRow, error: null };
            },
          }),
        };
      },

      delete: () => ({
        eq: async (col, value) => {
          rows = rows.filter((r) => r[col] !== value);
          return { data: [], error: null };
        },
      }),
    }),
  };

  return { supabase };
});

import { supabase } from "./src/lib/supabase";

describe("Study Records", () => {
  beforeEach(() => {
    supabase.__test.reset([
      { id: "1", title: "React", time: 30 },
      { id: "2", title: "Jest", time: 15 },
    ]);

    jest.spyOn(window, "alert").mockImplementation(() => {});
    jest.spyOn(window, "confirm").mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("タイトルが表示されていること", async () => {
    render(<App />);
    expect(await screen.findByRole("heading", { name: /study records/i })).toBeInTheDocument();
  });

  test("フォームに学習内容と時間を入力して登録ボタンを押すと新たに記録が追加されている", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole("heading", { name: /study records/i });

    await user.type(screen.getByPlaceholderText("todoを入力"), "TypeScript");
    await user.type(screen.getByPlaceholderText("時間"), "45");
    await user.click(screen.getByRole("button", { name: "追加" }));

    expect(await screen.findByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByText(/45/)).toBeInTheDocument();
  });

  test("削除ボタンを押すと学習記録が削除される", async () => {
  const user = userEvent.setup();
  render(<App />);

  await screen.findByRole("heading", { name: /study records/i });

  // ✅ まず Loading が消えるまで待つ（ここが重要）
  await waitFor(() => {
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  // ✅ React の行(p)を取る（改行・空白に強い）
  const reactRow = screen.getByText((content, element) => {
    return element?.tagName?.toLowerCase() === "p" && content.includes("React");
  });

  await user.click(within(reactRow).getByRole("button", { name: "削除" }));

  expect(window.confirm).toHaveBeenCalled();

  // ✅ 削除後に React 行が消えること
  await waitFor(() => {
    expect(
      screen.queryByText((content, element) => {
        return element?.tagName?.toLowerCase() === "p" && content.includes("React");
      })
    ).not.toBeInTheDocument();
  });
});



  test("入力をしないで登録を押すとエラーが表示される", async () => {
    const user = userEvent.setup();
    render(<App />);

    await screen.findByRole("heading", { name: /study records/i });

    await user.click(screen.getByRole("button", { name: "追加" }));

    // TodoInputに role="alert" を出す実装にした前提
    expect(await screen.findByRole("alert")).toHaveTextContent("学習内容と時間を入力してください");
  });
});
