import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dayjs from "dayjs";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/v1/" }),
  refetchOnReconnect: true,
  tagTypes: ["Budgets"],
  endpoints: (builder) => ({
    getAllExpense: builder.query({
      query: ({ current, pageSize, expenseDate = "" }) => ({
        url: `budgets?page=${current}&limit=${pageSize}&expenseDate=${expenseDate}`,
        method: "GET",
        headers: getHeaders(),
      }),
      providesTags: ["Budgets"],
      transformResponse: (response) => {
        const transformedResult = response.data.expenses.map((expense) => {
          const originalDate = new Date(expense.expenseDate);
          const formattedDate = originalDate.toLocaleDateString("en-US");
          return { ...expense, expenseDate: formattedDate };
        });

        return {
          status: response.status,
          totalExpenses: response.data.totalExpenses,
          expenses: transformedResult,
        };
      },
    }),
    addExpense: builder.mutation({
      query: (newExpense) => ({
        url: "budgets",
        method: "POST",
        headers: getHeaders(),
        body: newExpense,
      }),
      invalidatesTags: ["Budgets"],
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `budgets/${id}`,
        method: "DELETE",
        headers: getHeaders(),
      }),
      invalidatesTags: ["Budgets"],
    }),
    updateExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `budgets/${id}`,
        method: "PATCH",
        headers: getHeaders(),
        body: data,
      }),
      invalidatesTags: ["Budgets"],
    }),
    getExpenseTrends: builder.query({
      query: (date) => ({
        url: `budgets?expenseDate_gt=${date}`,
        method: "GET",
        headers: getHeaders(),
      }),
      transformResponse: (response) => {
        const transformedResults = response.data.expenses.map((expense) => {
          return {
            price: expense.expensePrice,
            date: dayjs(expense.expenseDate).format("YYYY-MM-DD"),
          };
        });
        transformedResults.sort((a, b) => {
          return dayjs(a.date).toDate() - dayjs(b.date).toDate();
        });

        return transformedResults;
      },
    }),
  }),
});

export const {
  useGetAllExpenseQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useGetExpenseTrendsQuery,
} = budgetApi;
