import React, { useState, ChangeEvent , FC } from 'react';

export const App : FC = () => {
  
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);
  const [removes, setRemoves] = useState<string[]>([]);
  const onChangeText = (e : ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    if (removes.includes(e.target.value)) {
      // 削除リストに既に入ってるものを選択した場合はOFFにしたと判断
      // イベント発行元を除いた配列をsetし直す
      setRemoves(removes.filter(item => item !== e.target.value));
    } else {
      // 削除リストに入っていない場合は追加
      setRemoves([...removes, e.target.value])
    }
  };
  const onClickAdd = () => {
    const newTodos = [...todos];
    if (text !== "") {
      newTodos.push(text);
      setTodos(newTodos);
      setText("")
    }
  };
  const onClickDelete = () => {
    //removesを元に削除を行う
    setTodos(todos.filter(item => !removes.includes(item)))
  };

  return (
    <div className="app">
      {/* タイトル */}
      <div className="app_title">
        <h2>Todo App</h2>
      </div>

      {/* TODO一覧*/}
      <input type="text" value={text} onChange={onChangeText} />
    
      <div className="todo_list">
        {todos.map((todo) => (
          <label>
            <div>
              <input type='checkbox' value={`${todo}`} onChange={handleChange} checked={removes.includes(todo)}/>
              {todo}
            </div>
          </label>
        ))}
      </div>

      {/* 追加、削除ボタン*/}
      <div className="function_btns">
        <button className="delete_btn" onClick={() => onClickDelete()}>ー</button>
        <button className="plus_btn" onClick={() => onClickAdd()}>＋</button>
      </div>
    </div>
  );
};


