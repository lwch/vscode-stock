# vscode-stock

支持在状态栏显示指定股票行情

![img](https://raw.sevencdn.com/lwch/vscode-stock/master/imgs/statusbar.png)

## 配置

> 文件 > 首选项 > 设置 > 扩展 > statusbar股票插件
>
> 支持修改股票代码和更新间隔时间
>   * 股票代码支持json数组
>   * 更新间隔时间需重启vscode
>
> ![img](https://raw.sevencdn.com/lwch/vscode-stock/master/imgs/config.png)
>
> ![img](https://raw.sevencdn.com/lwch/vscode-stock/master/imgs/config-code.png)

## 股票代号

1. sh<代号>：上海交易所，如sh000001
2. sz<代号>：深圳交易所，如sz399001
3. hk<代号>：港股，如hk01810
4. us<代号>：美股，如usAAPL

## 隐藏显示

1. 点击某只股票可隐藏该股票信息
2. 使用快捷键`ctrl+shift+h`一键隐藏所有股票信息
3. 使用快捷键`ctrl+shift+s`一键显示所有股票信息（可恢复点击隐藏的某支股票信息）

## TODO

- 限制更新时段，休盘时不进行调用