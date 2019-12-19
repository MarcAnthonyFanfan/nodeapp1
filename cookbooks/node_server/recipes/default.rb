package 'mysql-server' do
	action :install
end

package 'nodejs' do
	action :install
end

package 'npm' do
	action :install
end

package 'git' do
	action :install
end

branch_name = 'master'
git '/home/vagrant/nodeapp1' do                            
	repository 'https://github.com/MarcAnthonyFanfan/nodeapp1.git'
	action :sync
end

execute 'npm install' do
	cwd '/home/vagrant/nodeapp1'
	command 'npm install'
end

execute 'sudo mysql < db_setup.sql' do
	cwd '/home/vagrant/nodeapp1'
	command 'sudo mysql < db_setup.sql'
end
