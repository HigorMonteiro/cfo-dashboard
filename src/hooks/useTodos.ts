import { useState, useEffect } from 'react';

export interface TodoItem {
  id: string;
  text: string;
  checked: boolean;
}

const DEFAULT_TODOS: TodoItem[] = [
  {
    id: "1",
    text: "Review project requirements",
    checked: true,
  },
  {
    id: "2",
    text: "Create wireframes for new features",
    checked: true,
  },
  {
    id: "3",
    text: "Implement authentication system",
    checked: false,
  },
  {
    id: "4",
    text: "Write unit tests for core components",
    checked: false,
  },
  {
    id: "5",
    text: "Optimize database queries",
    checked: false,
  },
  {
    id: "6",
    text: "Deploy to staging environment",
    checked: false,
  },
];

const STORAGE_KEY = 'todo-list-items';

/**
 * Custom hook to manage todos with localStorage persistence
 * @returns {Object} Todo management methods and state
 */
export function useTodos() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load todos from localStorage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        const savedTodos = localStorage.getItem(STORAGE_KEY);
        if (savedTodos) {
          setItems(JSON.parse(savedTodos));
        } else {
          setItems(DEFAULT_TODOS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TODOS));
        }
      } catch (error) {
        console.error('Error loading todos:', error);
        setItems(DEFAULT_TODOS);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoading]);

  /**
   * Updates the todos list and persists changes
   * @param newItems - New todos array
   */
  const updateTodos = (newItems: TodoItem[]) => {
    setItems(newItems);
  };

  /**
   * Toggles a todo's checked state
   * @param id - Todo item ID
   */
  const toggleTodo = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  /**
   * Reorders todos after drag and drop
   * @param oldIndex - Original position
   * @param newIndex - New position
   */
  const reorderTodos = (oldIndex: number, newIndex: number) => {
    setItems((currentItems) => {
      const newItems = [...currentItems];
      const [removed] = newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, removed);
      return newItems;
    });
  };

  return {
    items,
    isLoading,
    updateTodos,
    toggleTodo,
    reorderTodos,
  };
} 