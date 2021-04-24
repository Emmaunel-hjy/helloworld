using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YSL.EntpLib.Data.Facade;

namespace TestWeb
{
    public class DBFactory
    {
        
        /// <summary>
        /// 获取数据库操作对象
        /// </summary>
        /// <param name="dataBaseType">数据库类型</param>
        /// <returns>数据库操作对象</returns>
        public static DBFacade GetDBFacade()
        {
            string connStr = "persist security info=True;packet size=4096;data source=(LOCAL);Password=huangjinyu;User ID=sa;initial catalog=TestDB";
            DBFacade dbFacade = GetMsSqlDBFacadeFromConnectionString(connStr);
            return dbFacade;
        }

        /// <summary>
        /// 获取MsSqlServer类型的DBFacade数据库操作类
        /// </summary>
        /// <param name="connectionString">连接字符串</param>
        /// <returns>数据库操作对象</returns>
        private static DBFacade GetMsSqlDBFacadeFromConnectionString(string connectionString)
        {
            connectionString = connectionString.Trim();
            return DBFacadeFactory.GetDBFacade(connectionString, DBFacadeType.MSSqlServer);
        }
    }
}