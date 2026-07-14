export default function ChatWindow() {
  return (
    <div className="flex flex-col flex-1 min-w-0 bg-[#020617]">

      {/* Header */}
      <div className="h-16 border-b border-slate-800 flex items-center px-8">

        <h2 className="text-white text-xl font-semibold">
          Welcome to Astra
        </h2>

      </div>

      {/* Messages */}
      <div className="flex-1 flex items-center justify-center px-8">

        <div className="text-center">

  <h1 className="text-6xl font-bold text-white">
    Welcome to Astra
  </h1>

  <p className="mt-6 text-xl text-slate-400">
    Build. Learn. Create.
  </p>

  <p className="text-slate-500 mt-2">
    Your personal AI assistant.
  </p>

</div>

      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-6">
  <div className="max-w-5xl mx-auto">
    <div className="flex items-center bg-slate-800 rounded-xl overflow-hidden">
    <input
      type="text"
      placeholder="Message Astra..."
      className="flex-1 bg-transparent p-4 text-white outline-none"
    />

    <button
  className="
    bg-indigo-600
    hover:bg-indigo-700
    px-8
    py-4
    font-semibold
    text-white
    rounded-r-xl
    transition
  "
>
  Send
</button>

  </div>
</div>
</div>

    </div>
  );
}