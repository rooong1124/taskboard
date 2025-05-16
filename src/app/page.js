// ==================== Next.js 應用入口 ====================
// 這是一個 Next.js 的客戶端組件
// 'use client' 是 Next.js 的特殊指令，表示這個組件需要在瀏覽器端執行，而不是伺服器端
// 這樣我們就可以使用瀏覽器的 API 和 React 的狀態管理功能
// 參考文件：https://nextjs.org/docs/getting-started/react-essentials
'use client';

// ==================== 引入必要的模組 ====================
// 引入 Next.js 的 Image 組件，用於優化圖片載入（雖然這個例子中沒有使用）
import Link from "next/link";
// 引入 React 的 useState Hook，這是 React 用於管理組件狀態的核心功能
// useState 允許我們在函數組件中使用狀態
// 參考文件：https://react.dev/reference/react/useState
import { useState, useEffect, use } from "react";
// 引入我們自定義的 TaskList 組件，用於顯示任務列表
import TaskList from "../components/TaskList";

// ==================== 主頁面組件 ====================
// 這是我們的主頁面組件，在 Next.js 中，page.js 檔案會自動成為路由頁面
export default function Home() {
  // ========== 狀態管理 ==========
  // 使用 useState Hook 創建兩個狀態：
  
  // 1. tasks 狀態：用於存儲所有任務的陣列
  // - tasks：當前的任務列表（陣列）
  // - setTasks：用於更新任務列表的函數
  // 初始值設為空陣列 []
  const [tasks, setTasks] = useState([]);
  
  // 2. newTask 狀態：用於管理輸入框的值
  // - newTask：輸入框的當前值
  // - setNewTask：用於更新輸入框值的函數
  // 初始值設為空字串 ''
  const [newTask, setNewTask] = useState('');

  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    const maxId = savedTasks.reduce((max, task) => Math.max(max, task.id), 0);
    setNextId(maxId + 1);
  }, []);
  // ========== 事件處理函數 ==========
  // 定義添加任務的函數，當點擊 "Add" 按鈕時會調用這個函數
  const addTask = () => {
    // 輸出當前任務列表，用於調試
    console.log("Before", tasks);
    // 輸出新任務的值，用於調試
    console.log("newTask", newTask);
    
    const newTaskObj = {
      id: nextId,
      title: newTask,
      description: "",
    };
    

    // 創建新的任務陣列
    // [...tasks, newTask] 是展開運算符的用法，它會：
    // 1. 複製原有的 tasks 陣列中的所有項目
    // 2. 在陣列末尾添加新的任務
    // 這樣做是為了保持狀態的不可變性（Immutability）
    // 參考文件：https://react.dev/learn/updating-arrays-in-state
    const updatedTasks = [...tasks, newTaskObj];
    
    // 使用 setTasks 更新任務列表
    // 這會觸發 React 的重新渲染週期
    setTasks(updatedTasks);
    
    // 輸出更新後的任務列表，用於調試
    console.log("After", updatedTasks);
    
    // 清空輸入框
    // 這會觸發輸入框的重新渲染，使其變為空
    setNewTask('');

    setNextId(nextId + 1);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  // ========== 渲染 UI ==========
  // 在 React 中，return 語句定義了組件的視覺結構
  // 當狀態改變時，這部分會自動重新渲染
  return (
    // main 標籤作為頁面的主要容器
    // className 使用 Tailwind CSS 的工具類來設置樣式
    // p-4：表示 padding: 1rem
    <main className="p-4 max-w-md mx-auto">
      {/* 頁面標題 */}
      {/* text-2xl：設置字體大小，font-bold：設置字體粗細 */}
      <h1 className="text-2xl font-bold">Task Board</h1>

      {/* 輸入區域容器 */}
      {/* flex：使用 flexbox 布局
          gap-2：設置子元素之間的間距
          mb-4：設置底部外邊距 */}
      <div className="flex gap-2 mb-4">
        {/* 任務輸入框 */}
        {/* value 綁定到 newTask 狀態，使其成為受控組件
            onChange 事件在每次輸入變化時更新 newTask 狀態
            參考文件：https://react.dev/learn/responding-to-events */}
        <input
          className="border p-2 flex-1"
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        {/* 添加按鈕 */}
        {/* onClick 事件處理器指定點擊時調用 addTask 函數 */}
        <button
          className="bg-blue-500 text-white px-4"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {/* 任務列表組件 */}
      {/* 將 tasks 陣列作為 props 傳遞給 TaskList 組件 */}
      {/* 當 tasks 狀態更新時，TaskList 會自動重新渲染 */}
      {/* 這體現了 React 的單向數據流：父組件 → 子組件 */}
      {/* 參考文件：https://react.dev/learn/passing-props-to-a-component */}
      <TaskList tasks={tasks} onDelete={handleDelete}/>
    </main>
  );
}
